import { Diet } from "./../utilities-class";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DietService {
  private url: string = "http://miallergie.freeboxos.fr:8080/";

  constructor(private http: HttpClient) {}

  public getDiets(): Promise<Diet[]> {
    return this.http.get<Diet[]>(this.url + "diets").toPromise<Diet[]>();
  }
}
