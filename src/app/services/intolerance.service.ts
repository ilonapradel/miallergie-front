import { Ingredient, Intolerance } from "./../utilities-class";
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.utilities = new UtilitiesClass(toastController, router);
  }

  public getIntolerances(): Promise<Intolerance[]> {
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
          return throwError(err);
        })
      )
      .toPromise<Intolerance[]>();
  }

  public getIntolerance(id: string): Promise<Intolerance> {
    return this.http
      .get<Intolerance>(this.url + "intolerances/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Intolerance>(
        catchError<Intolerance, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<Intolerance>();
  }
}
