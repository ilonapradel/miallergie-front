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
  private possibleIntolerances: Intolerance[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.utilities = new UtilitiesClass(toastController, router);
    this.getIntolerances();
  }

  public returnIntolerances(): Intolerance[] {
    return this.possibleIntolerances;
  }

  public getIntolerances(): Promise<Intolerance[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<{ id: string; userId: string; intoleranceId: string }[]>(
          this.url + "intolerances",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .toPromise<{ id: string; userId: string; intoleranceId: string }[]>()
        .then(async (intolerances) => {
          console.log("get", intolerances);
          const all: Intolerance[] = [];
          for (const intol of intolerances) {
            const intolToSave = await this.getIntolerance(intol.id);
            all.push(intolToSave);
          }
          console.log("save", all);
          this.possibleIntolerances = all;

          resolve();
        })
        .catch((err) => console.error(err));
    });
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
