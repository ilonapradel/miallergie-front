import { HttpClient } from "@angular/common/http";
import { Food } from "./../utilities-class";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FoodService {
  private url: string = "http://miallergie.freeboxos.fr:8080/";
  constructor(private http: HttpClient) {}

  public getFoods(): Promise<Food[]> {
    return this.http.get<Food[]>(this.url + "foods").toPromise<Food[]>();
  }
}
