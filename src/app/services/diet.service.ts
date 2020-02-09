import { Diet } from "./../utilities-class";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiUrl } from "../utilities-class";

@Injectable({
  providedIn: "root"
})
export class DietService {
  private url: string = ApiUrl;

  constructor(private http: HttpClient) {}

  public getDiets(): Promise<Diet[]> {
    return this.http.get<Diet[]>(this.url + "diets").toPromise<Diet[]>();
  }
}
