import { Ingredient, Intolerance, Food } from "./../utilities-class";
import { Injectable } from "@angular/core";
import { UtilitiesClass, ApiUrl, Diet } from "../utilities-class";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IntoleranceService {
  private utilities: UtilitiesClass;
  private url: string = ApiUrl;
  private knownIntolerances: Intolerance[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.utilities = new UtilitiesClass(toastController, router);
  }

  public returnIntolerances(): Intolerance[] {
    return this.knownIntolerances;
  }

  public loadIntolerances(): void {
    this.getIntolerances().then((intolerances) => {
      this.knownIntolerances = intolerances;
    });
  }

  private getIntolerances(): Promise<Intolerance[]> {
    return this.http
      .get<Intolerance[]>(this.url + "intolerances", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Intolerance[]>(
        catchError<Intolerance[], Observable<never>>((err: any) => {
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
      .toPromise<Intolerance[]>();
  }

  public returnIntoleranceById(id: string) {
    for (const intol of this.knownIntolerances) {
      if (intol.id === id) {
        return intol;
      }
    }
  }

  public getIntolerancesOfFood(foodId: string): Promise<Intolerance[]> {
    return this.http
      .get<Intolerance[]>(this.url + "foods/" + foodId + "/food-intolerances", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Intolerance[]>(
        catchError<Intolerance[], Observable<never>>((err: any) => {
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
      .toPromise<Intolerance[]>();
  }
}
