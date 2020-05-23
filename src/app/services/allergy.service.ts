import { isNullOrUndefined } from "util";
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
  }

  public loadAllergies(): void {
    this.getAllergies().then((allergies) => {
      this.possibleAllergies = allergies;
    });
  }

  public returnAllergies(): Allergy[] {
    return this.possibleAllergies;
  }

  private getAllergies(): Promise<Allergy[]> {
    return this.http
      .get<Allergy[]>(this.url + "allergies", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Allergy[]>(
        catchError<Allergy[], Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          try {
            let str = err.error.error.details[0];
            return throwError(str);
          } catch (error) {
            return throwError(err);
          }
        })
      )
      .toPromise<Allergy[]>();
  }

  public getAllergie(id: string): Allergy {
    if (isNullOrUndefined(this.possibleAllergies)) {
      this.getAllergies().then((allergies) => {
        this.possibleAllergies = allergies;
      });
    }
    for (const allergy of this.possibleAllergies) {
      if (allergy.id === id) {
        return allergy;
      }
    }
  }

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
