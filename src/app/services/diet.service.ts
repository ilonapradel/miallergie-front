import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Diet, UtilitiesClass } from "./../utilities-class";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiUrl } from "../utilities-class";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DietService {
  private utilities: UtilitiesClass;
  private url: string = ApiUrl;
  private knownDiets: Diet[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.utilities = new UtilitiesClass(toastController, router);
  }

  public loadDiets(): void {
    this.getDiets().then((diets) => (this.knownDiets = diets));
  }

  private getDiets(): Promise<Diet[]> {
    return this.http
      .get<Diet[]>(this.url + "diets", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Diet[]>(
        catchError<Diet[], Observable<never>>((err: any) => {
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
      .toPromise<Diet[]>();
  }

  public returnDiets(): Diet[] {
    return this.knownDiets;
  }

  public returnDietById(id: string) {
    for (const diet of this.knownDiets) {
      if (diet.id === id) {
        return diet;
      }
    }
  }

  private getDiet(id: string): Promise<Diet> {
    return this.http
      .get<Diet>(this.url + "diets/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Diet>(
        catchError<Diet, Observable<never>>((err: any) => {
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
      .toPromise<Diet>();
  }
}
