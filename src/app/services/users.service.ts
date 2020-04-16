import {
  UtilitiesClass,
  Preferences,
  Friend,
  Diet,
  Ingredient,
  Recipe,
  Allergy,
  Intolerance,
} from "./../utilities-class";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { User, ApiUrl } from "../utilities-class";
import { DietService } from "./diet.service";
@Injectable({
  providedIn: "root",
})
export class UsersService {
  private url: string = ApiUrl;
  public isAuth: boolean = false;
  private userId: string;
  private myUser: User = new User();

  private utilities: UtilitiesClass;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private dietService: DietService
  ) {
    this.utilities = new UtilitiesClass(toastController, router);

    this.myUser.preferences = {
      diets: [],
      allergies: [],
      intolerances: [],
    };

    console.log(this.myUser.preferences);
  }

  public init() {
    //TODO : faire les gets !!!
    this.myUser.nonRegisteredFriends = [
      {
        surname: "test",
        preferences: {},
      },
    ];

    this.myUser.registeredFriends = [
      {
        email: "coucou",
        username: "Lucas",
        preferences: {},
      },
      {
        email: "blabla",
        username: "Adrien",
        preferences: {},
      },
    ];
  }

  public register(username: string, email: string, password: string) {
    return this.http
      .post(this.url + "users/", {
        username: username,
        email: email,
        password: password,
      })
      .toPromise();
  }

  public login(email: string, password: string) {
    return this.http
      .post(this.url + "users/login", {
        email: email,
        password: password,
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
            this.userId = res.id;
            this.setUser(res.email, res.username, res.id);
          }
        )
      )
      .toPromise();
  }

  public changeUsername(newUsername: string) {
    return this.http
      .put(
        this.url + "users/" + this.userId,
        {
          username: newUsername,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .pipe(
        tap(() => {
          this.setUsername(newUsername);
        })
      )
      .pipe(
        catchError<any, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise();
  }

  public changeEmail(newEmail: string) {
    return this.http
      .put(
        this.url + "users/" + this.userId,
        {
          email: newEmail,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .pipe(
        tap(() => {
          this.setEmail(newEmail);
        })
      )
      .toPromise();
  }

  public changePassword(newPassword: string, oldPassword: string) {
    return this.http
      .put(
        this.url + "users/" + this.userId,
        {
          newPassword: newPassword,
          oldPassword: oldPassword,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .toPromise();
  }

  public getUser(): User {
    return this.myUser;
  }

  private setUser(email: string, username: string, id: string) {
    this.myUser.email = email;
    this.myUser.username = username;
    this.myUser.id = id;

    this.loadUserPreferences();
  }

  private setUsername(newUsername: string) {
    this.myUser.username = newUsername;
  }

  private setEmail(newEmail: string) {
    this.myUser.email = newEmail;
  }

  public getUserPreferences(): Preferences {
    this.loadUserPreferences();

    return this.myUser.preferences;
  }

  private loadUserPreferences(): void {
    this.getUserDiets();
    this.getUserIntolerances();
    this.getUserAllergies();
  }

  private getUserDiets(): void {
    this.http
      .get<Diet[]>(this.url + "users/" + this.userId + "/user-diets", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .toPromise<Diet[]>()
      .then(async (diets) => {
        console.log(diets);
        for (const diet of diets) {
          const dietToSave = await this.dietService.getDiet(diet.id);
          this.myUser.preferences.diets.push(dietToSave);
        }
        console.log(this.myUser.preferences);
      })
      .catch((err) => console.error(err));
  }

  private getUserAllergies(): void {
    this.http
      .get<Allergy[]>(this.url + "users/" + this.userId + "/user-allergies", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .toPromise<Allergy[]>()
      .then((allergies) => {
        for (const allergy of allergies) {
          this.myUser.preferences.allergies.push(allergy);
        }
      })
      .catch((err) => console.error(err));
  }

  private getUserIntolerances(): void {
    this.http
      .get<Intolerance[]>(
        this.url + "users/" + this.userId + "/user-intolerances",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .toPromise<Intolerance[]>()
      .then((intolerances) => {
        for (const intol of intolerances) {
          this.myUser.preferences.intolerances.push(intol);
        }
      })
      .catch((err) => console.error(err));
  }

  public addRegisteredFriend(newFriend: User) {
    this.myUser.registeredFriends.push(newFriend);
    console.log("addRegF", this.myUser.registeredFriends);
  }

  public addNonRegisteredFriend(newFriend: Friend) {
    this.myUser.nonRegisteredFriends.push(newFriend);
    console.log("addNonRegF", this.myUser.nonRegisteredFriends);
  }

  public saveUserPreferences(newPreferences: Preferences) {
    console.log({ newPreferences });
    this.saveDiets(newPreferences.diets);
    this.saveIntolerances(newPreferences.intolerances);
    this.saveAllergies(newPreferences.allergies);

    this.loadUserPreferences();
  }

  saveDiets(newDiets: Diet[]) {
    for (const diet of newDiets) {
      this.http
        .post(
          this.url + "users/" + this.userId + "/user-diets",
          {
            userId: this.userId,
            dietId: diet.id,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .toPromise();
    }
  }

  saveIntolerances(newIntolerances: Intolerance[]) {
    for (const intol of newIntolerances) {
      this.http
        .post(
          this.url + "users/" + this.userId + "/user-intolerances",
          {
            userId: this.userId,
            intoleranceId: intol.id,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .toPromise();
    }
  }

  saveAllergies(newAllergies: Allergy[]) {
    for (const allergie of newAllergies) {
      this.http
        .post(
          this.url + "users/" + this.userId + "/user-allergies",
          {
            userId: this.userId,
            allergyId: allergie.id,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .toPromise();
    }
  }
}
