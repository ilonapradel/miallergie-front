import { Router } from "@angular/router";
import { NavigationExtras } from "@angular/router";
import { Recipe } from "./../../utilities-class";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-recipe-card",
  templateUrl: "./recipe-card.component.html",
  styleUrls: ["./recipe-card.component.scss"]
})
export class RecipeCardComponent implements OnInit {
  @Input("recipe")
  recipe: Recipe;

  server: string = "http://miallergie.freeboxos.fr:8080/";

  constructor(private router: Router) {}

  ngOnInit() {}

  onClickRecipe() {
    let navigationExtras: NavigationExtras = {
      state: {
        recipe: this.recipe
      }
    };
    console.log(navigationExtras);
    this.router.navigate(["recipe-display"], navigationExtras);
  }
}
