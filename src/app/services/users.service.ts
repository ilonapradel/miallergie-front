import { Preferences, Friend } from "./../utilities-class";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { User } from "../utilities-class";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private url: string = "http://miallergie.freeboxos.fr:8080/";
  public isAuth: boolean = false;
  private id: string;
  private myUser: User = new User();
  private myUserPreferences: Preferences = {
    diet: "omnivore",
    allergy: [
     
    ],
    intolerance: ["gluten", "lactose"]
  };

  constructor(private http: HttpClient) {}

  public init() {
    this.myUser.nonRegisteredFriends = [
      {
        surname: "test",
        preferences: {
          diet: "paleo"
        }
      }
    ];

    this.myUser.preferences = this.myUserPreferences;
    this.myUser.registeredFriends = [
      {
        email: "coucou",
        username: "Lucas",
        preferences: {
          diet: "Vegan"
        }
      },
      {
        email: "blabla",
        username: "Adrien",
        preferences: {
          diet: "Omnivore"
        }
      }
    ];
  }

  public register(username: string, email: string, password: string) {
    return this.http
      .post(this.url + "users/", {
        username: username,
        email: email,
        password: password
      })
      .toPromise();
  }

  public login(email: string, password: string) {
    return this.http
      .post(this.url + "users/login", {
        email: email,
        password: password
      })
      .pipe(
        tap(
          (res: {
            token: string;
            id: string;
            email: string;
            username: string;
          }) => {
            let token: string = res.token;
            console.log(res);
            localStorage.setItem("access_token", token);
            this.isAuth = true;
            this.id = res.id;
            this.setUser(res.email, res.username, res.id);
          }
        )
      )
      .toPromise();
  }

  public changeUsername(newUsername: string) {
    return this.http
      .put(this.url + "users/" + this.id, {
        username: newUsername
      })
      .pipe(
        tap(() => {
          this.setUsername(newUsername);
        })
      )
      .toPromise();
  }

  public changeEmail(newEmail: string) {
    return this.http
      .put(this.url + "users/" + this.id, {
        email: newEmail
      })
      .pipe(
        tap(() => {
          this.setEmail(newEmail);
        })
      )
      .toPromise();
  }

  public changePassword(newPassword: string, oldPassword: string) {
    return this.http
      .put(this.url + "users/" + this.id, {
        newPassword: newPassword,
        oldPassword: oldPassword
      })
      .toPromise();
  }

  public getUser(): User {
    return this.myUser;
  }

  private setUser(email: string, username: string, id: string) {
    this.myUser.email = email;
    this.myUser.username = username;
    this.myUser.id = id;
  }

  private setUsername(newUsername: string) {
    this.myUser.username = newUsername;
  }

  private setEmail(newEmail: string) {
    this.myUser.email = newEmail;
  }

  public getUserPreferences(): Preferences {
    return this.myUserPreferences;
  }

  public changeUserPreferences(newPreferences: Preferences) {
    this.myUserPreferences = newPreferences;
  }

  public addRegisteredFriend(newFriend: User) {
    this.myUser.registeredFriends.push(newFriend);
    console.log("addRegF", this.myUser.registeredFriends);
  }

  public addNonRegisteredFriend(newFriend: Friend) {
    this.myUser.nonRegisteredFriends.push(newFriend);
    console.log("addNonRegF", this.myUser.nonRegisteredFriends);
  }
}
