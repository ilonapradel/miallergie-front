import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { UtilitiesClass } from "./../utilities-class";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe, Ingredient, Diet } from "../utilities-class";
import { ApiUrl } from "../utilities-class";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  private url: string = ApiUrl;

  private utilities: UtilitiesClass;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.utilities = new UtilitiesClass(toastController, router);
  }

  public getRecipes(filter?: string): Promise<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.url + "recipes/" + (filter ? "?" + filter : ""), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .toPromise<Recipe[]>();
  }

  public addRecipe(recipe: Recipe): Promise<Recipe> {
    let toSave: Recipe = JSON.parse(JSON.stringify(recipe));
    toSave.imageId = undefined;
    toSave.image = undefined;
    toSave.diets = undefined;
    toSave.ingredients = undefined;
    return this.http
      .post<Recipe>(this.url + "recipes/", toSave, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .pipe<Recipe>(
        catchError<Recipe, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return Observable.throw(err.statusText);
        })
      )
      .toPromise<Recipe>();
  }

  public getIngredientFromRecipe(recipe: Recipe): Promise<Ingredient[]> {
    return this.http
      .get<Ingredient[]>(this.url + "recipes/" + recipe.id + "/ingredients", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .pipe<Ingredient[]>(
        catchError<Ingredient[], Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return Observable.throw(err.statusText);
        })
      )
      .toPromise<Ingredient[]>();
  }

  public getDietsFromRecipe(recipe: Recipe): Promise<Diet[]> {
    return this.http
      .get<Diet[]>(this.url + "recipes/" + recipe.id + "/recipe-diets", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .pipe<Diet[]>(
        catchError<Diet[], Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return Observable.throw(err.statusText);
        })
      )
      .toPromise<Diet[]>();
  }

  public addIngredientToRecipe(
    recipe: Recipe,
    ingredient: Ingredient
  ): Promise<Ingredient> {
    let toSave: Ingredient = JSON.parse(JSON.stringify(ingredient));
    toSave.food = undefined;
    toSave.foodId = ingredient.food.id;

    return this.http
      .post<Ingredient>(
        this.url + "recipes/" + recipe.id + "/ingredients/",
        toSave,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
          }
        }
      )
      .pipe<Ingredient>(
        catchError<Ingredient, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return Observable.throw(err.statusText);
        })
      )
      .toPromise<Ingredient>();
  }

  public addImageToRecipe(recipe: Recipe, data: Blob, originalName: string) {
    const formData: FormData = new FormData();
    formData.append(recipe.id, data, originalName);
    return this.http
      .post(this.url + "recipes/" + recipe.id + "/uploadImage", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .pipe<Recipe>(
        catchError<Recipe, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return Observable.throw(err.statusText);
        })
      )
      .toPromise();
  }
}
