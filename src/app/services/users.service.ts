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
  private myUser: User;

  constructor(private http: HttpClient) {}

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
    this.myUser = {
      email: email,
      username: username,
      id: id
    };
  }

  private setUsername(newUsername: string) {
    this.myUser.username = newUsername;
  }

  private setEmail(newEmail: string) {
    this.myUser.email = newEmail;
  }
}
