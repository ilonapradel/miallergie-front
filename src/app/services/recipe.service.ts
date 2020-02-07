import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe, Ingredient } from "../utilities-class";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  private url: string = "http://miallergie.freeboxos.fr:8080/";
  constructor(private http: HttpClient) {}

  public addRecipe(recipe: Recipe): Promise<ApiRecipe> {
    let toSave: ApiRecipe = new ApiRecipe(recipe);
    return this.http
      .post<ApiRecipe>(this.url + "recipes/", toSave)
      .toPromise<ApiRecipe>();
  }

  public addIngrediantToRecipe(
    recipe: ApiRecipe,
    ingredient: Ingredient
  ): Promise<ApiIngredient> {
    let toSave: ApiIngredient = new ApiIngredient(ingredient);
    return this.http
      .post<ApiIngredient>(
        this.url + "recipes/" + recipe.id + "/ingrediants/",
        toSave
      )
      .toPromise<ApiIngredient>();
  }
}

export class ApiRecipe {
  public id?: string;
  public name: string = "";
  public difficulty: number = 3;
  public dietId: string = "";
  public duration: number = 15;
  public numberOfPeople: number = 1;
  public stages: string[] = [];

  constructor(recipe: Recipe) {
    this.dietId = recipe.diet.id;
    this.difficulty = recipe.difficulty;
    this.duration = recipe.duration;
    this.name = recipe.name;
    this.numberOfPeople = recipe.numberOfPeople;
    this.stages = recipe.stages;
  }
}

export class ApiIngredient {
  public id: number;
  public foodId?: string;
  public recipeId?: string;
  public quantity?: number = 1;
  public unit?: string = "g";

  constructor(ingrediant: Ingredient) {
    this.quantity = ingrediant.quantity;
    this.unit = ingrediant.unit;
    this.foodId = ingrediant.food.id;
  }
}
