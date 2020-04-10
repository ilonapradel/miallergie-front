import { Recipe } from "./../utilities-class";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-recipe",
  templateUrl: "./add-recipe.page.html",
  styleUrls: ["./add-recipe.page.scss"]
})
export class AddRecipePage implements OnInit {
  myRecipe: Recipe = new Recipe();

  constructor() {}

  ngOnInit() {}
}
