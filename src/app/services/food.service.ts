import { Observable, throwError } from "rxjs";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Food, UtilitiesClass } from "./../utilities-class";
import { Injectable } from "@angular/core";
import { ApiUrl } from "../utilities-class";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FoodService {
  private url: string = ApiUrl;
  private knownFoods: Food[] = [];

  private utilities: UtilitiesClass;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.utilities = new UtilitiesClass(toastController, router);
  }

  public returnFoods() {
    return this.knownFoods;
  }

  public loadFoods(): void {
    this.getFoods().then((foods) => {
      this.knownFoods = foods;
    });
  }

  //?filter[include][0][relation]=food-allergies
  private getFoods(): Promise<Food[]> {
    return this.http
      .get<Food[]>(
        this.url + "foods?filter[include][0][relation]=foodAllergies",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .pipe<Food[]>(
        catchError<Food[], Observable<never>>((err: any) => {
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
      .toPromise<Food[]>();
  }

  public getUnits(): Promise<any[]> {
    return this.http
      .get<any[]>(this.url + "units", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<any[]>(
        catchError<Food[], Observable<never>>((err: any) => {
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
      .toPromise<any[]>();
  }
}
