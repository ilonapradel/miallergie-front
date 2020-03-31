import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Diet, UtilitiesClass } from "./../utilities-class";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiUrl } from "../utilities-class";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DietService {
  private utilities: UtilitiesClass;
  private url: string = ApiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.utilities = new UtilitiesClass(toastController, router);
  }

  public getDiets(): Promise<Diet[]> {
    return this.http
      .get<Diet[]>(this.url + "diets", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .pipe<Diet[]>(
        catchError<Diet[], Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<Diet[]>();
  }
}
