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

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.utilities = new UtilitiesClass(toastController, router);
  }

  public getAllergies(): Promise<Allergy[]> {
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
          return throwError(err);
        })
      )
      .toPromise<Allergy[]>();
  }

  public getAllergie(id: string): Promise<Allergy> {
    return this.http
      .get<Allergy>(this.url + "intolerances/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Allergy>(
        catchError<Allergy, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<Allergy>();
  }
}
