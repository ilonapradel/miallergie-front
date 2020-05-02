import { isUndefined } from "util";
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

  public getAllAboutUser(): Promise<any> {
    return this.http
      .get<any>(this.url + "users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .toPromise();
  }

  private loadUserData(): void {
    this.getAllAboutUser().then((userData) => {
      this.getDietsFromUserData(userData.diets);
      this.getAllergiesFromUserData(userData.allergies);
      this.getIntolerancesFromUserData(userData.intolerances);
      this.getFriendFromUserData(userData.nonRegisteredFriends, false);
      this.getFriendFromUserData(userData.registeredFriends, true);
    });
  }

  private getDietsFromUserData(diets: any[]) {
    for (const dataDiet of diets) {
      const dietToSave = dataDiet.diet;
      this.myUser.preferences.diets.push(dietToSave);
    }
  }
  private getAllergiesFromUserData(allergies: any[]) {
    for (const dataAllergie of allergies) {
      const toSave = dataAllergie.allergy;
      this.myUser.preferences.allergies.push(toSave);
    }
  }
  private getIntolerancesFromUserData(intolerances: any[]) {
    for (const dataIntol of intolerances) {
      const toSave = dataIntol.intolerance;
      this.myUser.preferences.intolerances.push(toSave);
    }
  }

  private getFriendFromUserData(friends: any, areRegistered: boolean) {
    if (areRegistered) {
      for (const rgDataFriend of friends) {
        const friend: User = new User();
        friend.id = rgDataFriend.userid;
        friend.username = rgDataFriend.friendUser.username;
        friend.preferences.allergies = rgDataFriend.friendUser.allergies;
        friend.preferences.intolerances = rgDataFriend.friendUser.intolerances;
        friend.preferences.diets = rgDataFriend.friendUser.diets;
        this.myUser.registeredFriends.push(friend);
      }
    } else {
      for (const nonRgDataFriend of friends) {
        const friend: Friend = new Friend();
        friend.surname = nonRgDataFriend.surname;
        friend.preferences.allergies = nonRgDataFriend.allergies;
        friend.preferences.intolerances = nonRgDataFriend.intolerances;
        friend.preferences.diets = nonRgDataFriend.diets;
        this.myUser.nonRegisteredFriends.push(friend);
      }
    }
  }

  // public loadFriends(): void {
  //   this.getRegisteredFriends().then((friends) => {
  //     this.myUser.registeredFriends = friends;
  //   });

  //   this.getNonRegisteredFriends().then((friends) => {
  //     this.myUser.nonRegisteredFriends = friends;
  //   });
  // }

  // private getRegisteredFriends(): Promise<User[]> {
  //   return this.http
  //     .get<User[]>(this.url + "users/" + this.userId + "/registered-friends", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("access_token"),
  //       },
  //     })
  //     .toPromise();
  // }

  // private getNonRegisteredFriends(): Promise<Friend[]> {
  //   return this.http
  //     .get<Friend[]>(this.url + "users/" + this.userId + "/friends", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("access_token"),
  //       },
  //     })
  //     .toPromise();
  // }

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
            this.loadUserData();
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

  public addRegisteredFriend(newFriend: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.filterUserOnEmail(newFriend.email)
        .then((bddUsers) => {
          if (isUndefined(bddUsers) || bddUsers.length === 0) {
            resolve(false);
          }
          const findedUser = bddUsers[0];

          for (const friend of this.myUser.registeredFriends) {
            if (findedUser.id === friend.id) {
              resolve(false);
            }
          }

          this.postRegisteredFriend(findedUser).then((user) => {
            this.myUser.registeredFriends.push(findedUser);
            resolve(true);
          });
        })
        .catch((err) => reject(err));
    });
  }

  private postRegisteredFriend(userFriend: User): Promise<User> {
    return this.http
      .post<User>(
        this.url + "users/" + this.userId + "/registered-friends",
        {
          friendUserId: userFriend.id,
          ownerUserId: this.userId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .toPromise();
  }

  private postFriend(userFriend: Friend): Promise<User> {
    return this.http
      .post<User>(
        this.url + "users/" + this.userId + "/friends",
        {
          surname: userFriend.surname,
          userId: this.userId, // Todo : a supprimer quand lucas aura fix
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .toPromise();
  }

  public addNonRegisteredFriend(newFriend: Friend) {
    this.postFriend(newFriend).then((friend) => {
      this.savePreferences(newFriend.preferences, friend.id);
    });
  }

  public async saveUserPreferences(newPreferences: Preferences) {
    this.savePreferences(newPreferences, this.userId);
  }

  private async savePreferences(newPreferences: Preferences, id: string) {
    await this.deleteUserDiets(id);
    await this.deleteUserAllergies(id);
    await this.deleteUserIntolerances(id);

    this.saveDiets(newPreferences.diets, id);
    this.saveAllergies(newPreferences.allergies, id);
    this.saveIntolerances(newPreferences.intolerances, id);
  }

  deleteUserDiets(id: string): Promise<any> {
    return this.http
      .delete<any>(this.url + "users/" + id + "/user-diets", {
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

  deleteUserAllergies(id: string): Promise<any> {
    return this.http
      .delete<any>(this.url + "users/" + id + "/user-allergies", {
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

  deleteUserIntolerances(id: string): Promise<any> {
    return this.http
      .delete<any>(this.url + "users/" + id + "/user-intolerances", {
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

  saveDiets(newDiets: Diet[], id: string) {
    for (const diet of newDiets) {
      this.http
        .post(
          this.url + "users/" + id + "/user-diets",
          {
            userId: id,
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

  saveIntolerances(newIntolerances: Intolerance[], id: string) {
    for (const intol of newIntolerances) {
      this.http
        .post(
          this.url + "users/" + id + "/user-intolerances",
          {
            userId: id,
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

  saveAllergies(newAllergies: Allergy[], id: string) {
    for (const allergie of newAllergies) {
      this.http
        .post(
          this.url + "users/" + id + "/user-allergies",
          {
            userId: id,
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

  filterUserOnEmail(email: string): Promise<User[]> {
    let filter = "?filter[where][email]=" + email;

    return this.http
      .get<User[]>(this.url + "users/" + filter, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .toPromise<User[]>();
  }
}
