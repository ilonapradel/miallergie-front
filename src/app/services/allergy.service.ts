import { Injectable } from "@angular/core";
import { UtilitiesClass, ApiUrl, Allergy } from "../utilities-class";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AllergyService {
  private utilities: UtilitiesClass;
  private url: string = ApiUrl;
  private possibleAllergies: Allergy[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.utilities = new UtilitiesClass(toastController, router);
    this.loadAllergies();
  }

  public async getAllergies(): Promise<Allergy[]> {
    await this.loadAllergies();
    return this.possibleAllergies;
  }

  public returnAllergies(): Allergy[] {
    return this.possibleAllergies;
  }

  private loadAllergies(): Promise<Allergy[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<Allergy[]>(this.url + "allergies", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .toPromise<Allergy[]>()
        .then(async (allergies) => {
          this.possibleAllergies = allergies;
          resolve();
        })
        .catch((err) => console.error(err));
    });
  }

  // public getAllergie(id: string): Promise<Allergy> {
  //   return this.http
  //     .get<Allergy>(this.url + "allergies/" + id, {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("access_token"),
  //       },
  //     })
  //     .pipe<Allergy>(
  //       catchError<Allergy, Observable<never>>((err: any) => {
  //         if (err.status === 401) {
  //           this.utilities.disconnect();
  //         }
  //         return throwError(err);
  //       })
  //     )
  //     .toPromise<Allergy>();
  // }

  // public getAllergiesOfFood(foodId: string): Promise<Allergy[]> {
  //   return this.http
  //     .get<Allergy[]>(this.url + "foods/" + foodId + "/food-allergies", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("access_token"),
  //       },
  //     })
  //     .pipe<Allergy[]>(
  //       catchError<Allergy[], Observable<never>>((err: any) => {
  //         if (err.status === 401) {
  //           this.utilities.disconnect();
  //         }
  //         return throwError(err);
  //       })
  //     )
  //     .toPromise<Allergy[]>();
  // }
}
