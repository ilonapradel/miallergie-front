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
      .get<Recipe[]>(this.url + "recipes/" + (filter ? "?" + filter : ""))
      .toPromise<Recipe[]>();
  }

  public addRecipe(recipe: Recipe): Promise<Recipe> {
    let toSave: Recipe = JSON.parse(JSON.stringify(recipe));
    toSave.imageId = undefined;
    toSave.image = undefined;
    toSave.dietId = recipe.diet.id;
    toSave.diet = undefined;
    toSave.ingredients = undefined;
    return this.http
      .post<Recipe>(this.url + "recipes/", toSave)
      .toPromise<Recipe>();
  }

  public getIngredientFromRecipe(recipe: Recipe): Promise<Ingredient[]> {
    return this.http
      .get<Ingredient[]>(this.url + "recipes/" + recipe.id + "/ingredients")
      .toPromise<Ingredient[]>();
  }

  public getDietFromRecipe(recipe: Recipe): Promise<Diet> {
    return this.http
      .get<Diet>(this.url + "recipes/" + recipe.id + "/diet")
      .toPromise<Diet>();
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
        toSave
      )
      .toPromise<Ingredient>();
  }

  public addImageToRecipe(recipe: Recipe, data: Blob, originalName: string) {
    const formData: FormData = new FormData();
    formData.append(recipe.id, data, originalName);
    return this.http
      .post(this.url + "recipes/" + recipe.id + "/uploadImage", formData)
      .toPromise();
  }
}

/* export class ApiRecipe {
  public id?: string;
  public name: string = "";
  public difficulty: number = 3;
  public dietId: string = "";
  public diet?: Diet;
  public duration: number = 15;
  public numberOfPeople: number = 1;
  public stages: string[] = [];
  public type: string;
  public imageId?: string = "";
  public image?: File;

  constructor(recipe: Recipe) {
    this.dietId = recipe.diet.id;
    this.difficulty = recipe.difficulty;
    this.duration = recipe.duration;
    this.name = recipe.name;
    this.numberOfPeople = recipe.numberOfPeople;
    this.stages = recipe.stages;
    this.type = recipe.type;
    this.imageId = recipe.image.id ? recipe.image.id : "";
  }
}

export class ApiIngredient {
  public id: number;
  public foodId?: string;
  public recipeId?: string;
  public quantity?: number = 1;
  public unit?: string = "g";

  constructor(ingredient: Ingredient) {
    this.quantity = ingredient.quantity;
    this.unit = ingredient.unit;
    this.foodId = ingredient.food.id;
  }
} */
