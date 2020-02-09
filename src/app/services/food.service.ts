import { HttpClient } from "@angular/common/http";
import { Food } from "./../utilities-class";
import { Injectable } from "@angular/core";
import { ApiUrl } from "../utilities-class";

@Injectable({
  providedIn: "root"
})
export class FoodService {
  private url: string = ApiUrl;
  constructor(private http: HttpClient) {}

  public getFoods(): Promise<Food[]> {
    return this.http.get<Food[]>(this.url + "foods").toPromise<Food[]>();
  }
}
