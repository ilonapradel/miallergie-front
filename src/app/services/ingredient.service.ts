import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ApiUrl, UtilitiesClass } from "./../utilities-class";
import { Ingredient, Recipe, Food } from "../utilities-class";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class IngredientService {
  private url: string = ApiUrl;

  private utilities: UtilitiesClass;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.utilities = new UtilitiesClass(toastController, router);
  }

  public getFoodOfIngredient(ingredient: Ingredient): Promise<Food> {
    return this.http
      .get<Food>(this.url + "ingredients/" + ingredient.id + "/food", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Food>(
        catchError<Food, Observable<never>>((err: any) => {
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
      .toPromise<Food>();
  }
}

/* export class ApiFood {
  id: string = "";
  name: string = "";
  constructor(food: Food | null) {
    if (food) {
      this.id = food.id;
      this.name = food.name;
    }
  }
} */
