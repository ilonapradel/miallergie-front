import { IntoleranceService } from "./intolerance.service";
import { AllergyService } from "./allergy.service";
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
    private dietService: DietService,
    private allergyService: AllergyService,
    private intoleranceService: IntoleranceService
  ) {
    this.utilities = new UtilitiesClass(toastController, router);

    this.myUser.preferences = new Preferences();
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
            console.log({ token });
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

  public returnUserPreferences(): Preferences {
    return this.myUser.preferences;
  }

  private async loadUserPreferences(): Promise<void> {
    const promises: Promise<void>[] = [];
    promises.push(this.getUserDiets());
    promises.push(this.getUserIntolerances());
    promises.push(this.getUserAllergies());

    await Promise.all(promises);
  }

  private getUserDiets(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get<{ id: string; userId: string; dietId: string }[]>(
          this.url + "users/" + this.userId + "/user-diets",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .toPromise<{ id: string; userId: string; dietId: string }[]>()
        .then(async (diets) => {
          const userDiets: Diet[] = [];
          for (const diet of diets) {
            const dietToSave = await this.dietService.getDiet(diet.dietId);
            userDiets.push(dietToSave);
          }
          this.myUser.preferences.diets = userDiets;

          resolve();
        })
        .catch((err) => console.error(err));
    });
  }

  private getUserAllergies(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get<{ id: string; userId: string; allergyId: string }[]>(
          this.url + "users/" + this.userId + "/user-allergies",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .toPromise<{ id: string; userId: string; allergyId: string }[]>()
        .then(async (allergies) => {
          const userAllergies: Allergy[] = [];
          for (const allergy of allergies) {
            const allergyToSave = await this.allergyService.getAllergie(
              allergy.allergyId
            );
            userAllergies.push(allergyToSave);
          }
          this.myUser.preferences.allergies = userAllergies;

          resolve();
        })
        .catch((err) => console.error(err));
    });
  }

  private getUserIntolerances(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get<{ id: string; userId: string; intoleranceId: string }[]>(
          this.url + "users/" + this.userId + "/user-intolerances",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .toPromise<{ id: string; userId: string; intoleranceId: string }[]>()
        .then(async (intolerances) => {
          const intols: Intolerance[] = [];
          for (const intol of intolerances) {
            const intolToSave = await this.intoleranceService.getIntolerance(
              intol.intoleranceId
            );
            intols.push(intolToSave);
          }
          this.myUser.preferences.intolerances = intols;

          resolve();
        })
        .catch((err) => console.error(err));
    });
  }

  public addRegisteredFriend(newFriend: User) {
    this.myUser.registeredFriends.push(newFriend);
  }

  public addNonRegisteredFriend(newFriend: Friend) {
    this.myUser.nonRegisteredFriends.push(newFriend);
  }

  public async saveUserPreferences(newPreferences: Preferences) {
    await this.deleteUserDiets();
    await this.deleteUserAllergies();
    await this.deleteUserIntolerances();

    this.saveDiets(newPreferences.diets);
    this.saveAllergies(newPreferences.allergies);
    this.saveIntolerances(newPreferences.intolerances);

    this.loadUserPreferences();
  }

  deleteUserDiets(): Promise<any> {
    return this.http
      .delete<any>(this.url + "users/" + this.userId + "/user-diets", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<any>(
        catchError<any, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<any>();
  }

  deleteUserAllergies(): Promise<any> {
    return this.http
      .delete<any>(this.url + "users/" + this.userId + "/user-allergies", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<any>(
        catchError<any, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<any>();
  }

  deleteUserIntolerances(): Promise<any> {
    return this.http
      .delete<any>(this.url + "users/" + this.userId + "/user-intolerances", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<any>(
        catchError<any, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<any>();
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
