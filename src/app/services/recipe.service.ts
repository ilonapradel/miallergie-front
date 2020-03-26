import { File } from "./../utilities-class";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe, Ingredient, Diet } from "../utilities-class";
import { ApiUrl } from "../utilities-class";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  private url: string = ApiUrl;
  constructor(private http: HttpClient) {}

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
      .toPromise<Recipe>();
  }

  public getIngredientFromRecipe(recipe: Recipe): Promise<Ingredient[]> {
    return this.http
      .get<Ingredient[]>(this.url + "recipes/" + recipe.id + "/ingredients", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .toPromise<Ingredient[]>();
  }

  public getDietFromRecipe(recipe: Recipe): Promise<Diet[]> {
    return this.http
      .get<Diet[]>(this.url + "recipes/" + recipe.id + "/diet", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
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
      .toPromise();
  }
}
