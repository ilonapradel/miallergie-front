import { Ingredient, Recipe, Food } from "../utilities-class";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class IngredientService {
  private url: string = "http://miallergie.freeboxos.fr:8080/";

  constructor(private http: HttpClient) {}

  public getFoodOfIngredient(ingredient: Ingredient): Promise<Food> {
    return this.http
      .get<Food>(this.url + "ingredients/" + ingredient.id + "/food")
      .toPromise<Food>();
  }
}

export class ApiFood {
  id: string = "";
  name: string = "";
  constructor(food: Food | null) {
    if (food) {
      this.id = food.id;
      this.name = food.name;
    }
  }
}