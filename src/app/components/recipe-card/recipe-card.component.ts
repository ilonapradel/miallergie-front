import { Router } from "@angular/router";
import { NavigationExtras } from "@angular/router";
import { Recipe } from "../../utilities-class";
import { Component, OnInit, Input } from "@angular/core";
import { ApiUrl } from "../../utilities-class";
@Component({
  selector: "app-recipe-card",
  templateUrl: "./recipe-card.component.html",
  styleUrls: ["./recipe-card.component.scss"]
})
export class RecipeCardComponent implements OnInit {
  @Input("recipe")
  recipe: Recipe;

  server: string = ApiUrl;

  constructor() {}

  ngOnInit() {}
}