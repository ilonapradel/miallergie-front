import { Ingredient, Recipe } from "./../utilities-class";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class IngrediantService {
  private url: string = "http://miallergie.freeboxos.fr:8080/";

  constructor(private http: HttpClient) {}
}
