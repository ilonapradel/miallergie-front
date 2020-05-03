import { AllergyService } from "./allergy.service";
import { IntoleranceService } from "./intolerance.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  UtilitiesClass,
  Preferences,
  Intolerance,
  Allergy,
} from "./../utilities-class";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe, Ingredient, Diet } from "../utilities-class";
import { ApiUrl } from "../utilities-class";
import {
  SearchRequest,
  SearchRequestWhereOr,
  SearchRequestInclude,
} from "../search-utilities";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private url: string = ApiUrl;

  private utilities: UtilitiesClass;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private intoleranceService: IntoleranceService,
    private allergieService: AllergyService
  ) {
    this.utilities = new UtilitiesClass(toastController, router);
  }

  public getRecipes(filter?: string): Promise<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.url + "recipes/" + (filter ? "?" + filter : ""), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .toPromise<Recipe[]>();
  }

  public addRecipe(recipe: Recipe): Promise<Recipe> {
    const toSave: Recipe = JSON.parse(JSON.stringify(recipe));
    toSave.imageId = undefined;
    toSave.image = undefined;
    toSave.diets = undefined;
    toSave.ingredients = undefined;
    return this.http
      .post<Recipe>(this.url + "recipes/", toSave, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Recipe>(
        catchError<Recipe, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<Recipe>();
  }

  public updateRecipe(recipe: Recipe): Promise<Recipe> {
    const toSave = JSON.parse(JSON.stringify(recipe));
    toSave.diets = undefined;
    toSave.image = undefined;
    toSave.ingredients = undefined;
    return this.http
      .patch<Recipe>(this.url + "recipes/" + recipe.id, toSave, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Recipe>(
        catchError<Recipe, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<Recipe>();
  }

  public getIngredientFromRecipe(recipe: Recipe): Promise<Ingredient[]> {
    return this.http
      .get<Ingredient[]>(this.url + "recipes/" + recipe.id + "/ingredients", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Ingredient[]>(
        catchError<Ingredient[], Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<Ingredient[]>();
  }

  public getDietsFromRecipe(
    recipe: Recipe
  ): Promise<[{ id: string; dietId: string; recipeId: string }]> {
    return this.http
      .get<[{ id: string; dietId: string; recipeId: string }]>(
        this.url + "recipes/" + recipe.id + "/recipe-diets",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .pipe<[{ id: string; dietId: string; recipeId: string }]>(
        catchError<
          [{ id: string; dietId: string; recipeId: string }],
          Observable<never>
        >((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<[{ id: string; dietId: string; recipeId: string }]>();
  }

  public addDietToRecipe(recipe: Recipe, diet: Diet): Promise<Diet> {
    return this.http
      .post<Diet>(
        this.url + "recipes/" + recipe.id + "/recipe-diets",
        {
          dietId: diet.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .pipe<Diet>(
        catchError<Diet, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<Diet>();
  }

  public deleteDietsFromRecipe(recipe: Recipe): Promise<Diet> {
    return this.http
      .delete<any>(this.url + "recipes/" + recipe.id + "/recipe-diets", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<any>(
        catchError<any, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<any>();
  }

  public addIngredientToRecipe(
    recipe: Recipe,
    ingredient: Ingredient
  ): Promise<Ingredient> {
    const toSave: Ingredient = JSON.parse(JSON.stringify(ingredient));
    toSave.food = undefined;
    toSave.foodId = ingredient.food.id;
    toSave.id = undefined;

    return this.http
      .post<Ingredient>(
        this.url + "recipes/" + recipe.id + "/ingredients/",
        toSave,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .pipe<Ingredient>(
        catchError<Ingredient, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<Ingredient>();
  }

  public deleteIngredientsFromRecipe(recipe: Recipe): Promise<any> {
    return this.http
      .delete<any>(this.url + "recipes/" + recipe.id + "/ingredients/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<any>(
        catchError<any, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise<any>();
  }

  public addImageToRecipe(recipe: Recipe, data: Blob, originalName: string) {
    const formData: FormData = new FormData();
    formData.append(recipe.id, data, originalName);
    return this.http
      .post(this.url + "recipes/" + recipe.id + "/uploadImage", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Recipe>(
        catchError<Recipe, Observable<never>>((err: any) => {
          if (err.status === 401) {
            this.utilities.disconnect();
          }
          return throwError(err);
        })
      )
      .toPromise();
  }

  public deleteRecipe(recipe: Recipe): Promise<Recipe> {
    return this.http
      .delete(this.url + "recipes/" + recipe.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .pipe<Recipe>(
        catchError<Recipe, Observable<never>>((err: any) => {
          this.catchErrorOnDelete(err);
          return throwError(err);
        })
      )
      .toPromise<Recipe>();
  }

  catchErrorOnDelete(err: any) {
    if (err.status === 401) {
      this.utilities.disconnect();
    } else if (err.status === 403) {
      this.utilities.showToastSimple(
        "Une erreur s'est produite : mauvais utilisateur",
        2000,
        "danger"
      );
    } else if (err.status === 204) {
      this.utilities.showToastSimple(
        "La recette a été supprimée avec succès",
        2000,
        "success"
      );
    }
  }

  searchRecipesDependingOnPref(pref: Preferences): Promise<Recipe[]> {
    const request = new SearchRequest();
    const where = request.where;
    const include = request.include;

    if (pref.diets && pref.diets.length > 0) {
      const relationRequest = new SearchRequestInclude();
      relationRequest.relation = "diets";

      const tab: SearchRequestWhereOr[] = [];
      for (const diet of pref.diets) {
        const newR: SearchRequestWhereOr = {
          dietId: diet.id,
        };
        tab.push(newR);
      }
      relationRequest.scope.where.or = tab;
      include.push(relationRequest);
    }

    // TODO implémenter les allergies dans les recettes
    // let or_allergies = [];
    // for (const allergy of pref.allergies) {
    //   or_allergies.push({ allergyId: allergy.id });
    // }

    const relationImageRequest = new SearchRequestInclude();
    relationImageRequest.relation = "image";
    include.push(relationImageRequest);

    return this.getRecipes("filter=" + JSON.stringify(request));
  }

  public saveAllergiesAndIntolerancesOfRecipe(recipe: Recipe): void {
    for (const ing of recipe.ingredients) {
      const allergies = ing.food.allergies;
      for (const all of allergies) {
        if (recipe.allergies.indexOf(all) === -1) {
          recipe.allergies.push(all);
        }
      }

      const intolerances = ing.food.intolerances;
      for (const intol of intolerances) {
        if (recipe.intolerances.indexOf(intol) === -1) {
          recipe.intolerances.push(intol);
        }
      }
    }

    this.postAllergiesOfRecipe(recipe);
    this.postIntolerancesOfRecipe(recipe);
  }

  private postAllergiesOfRecipe(recipe: Recipe): void {
    for (const all of recipe.allergies) {
      this.http
        .post<Recipe>(
          this.url + "recipes/" + recipe.id + "/recipe-allergies",
          {
            allergyId: all.id,
            recipeId: recipe.id,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .pipe<Recipe>(
          catchError<Recipe, Observable<never>>((err: any) => {
            if (err.status === 401) {
              this.utilities.disconnect();
            }
            return throwError(err);
          })
        );
    }
  }

  private postIntolerancesOfRecipe(recipe: Recipe): void {
    for (const intol of recipe.intolerances) {
      this.http
        .post<Recipe>(
          this.url + "recipes/" + recipe.id + "/recipe-intolerances",
          {
            intoleranceId: intol.id,
            recipeId: recipe.id,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .pipe<Recipe>(
          catchError<Recipe, Observable<never>>((err: any) => {
            if (err.status === 401) {
              this.utilities.disconnect();
            }
            return throwError(err);
          })
        );
    }
  }

  // public getAllergiesAndIntolerancesFromRecipe(recipe: Recipe): void {
  //   let intolerancesInRecipe: Intolerance[] = [];
  //   let allergiesInRecipe: Allergy[] = [];
  //   this.getIngredientFromRecipe(recipe).then((ingredients) => {
  //     recipe.ingredients = ingredients;
  //     for (const ing of recipe.ingredients) {
  //       this.intoleranceService
  //         .getIntolerancesOfFood(ing.foodId)
  //         .then((intols) => {
  //           console.log({ intols });
  //           intolerancesInRecipe.concat(intols);
  //         });

  //       this.allergieService
  //         .getAllergiesOfFood(ing.foodId)
  //         .then((allergies) => {
  //           console.log(allergies);
  //           allergiesInRecipe.concat(allergies);
  //         });
  //     }
  //     console.log(intolerancesInRecipe);
  //     console.log(allergiesInRecipe);
  //   });

  //   recipe.allergies = allergiesInRecipe;
  //   recipe.intolerances = intolerancesInRecipe;
  // }
}
