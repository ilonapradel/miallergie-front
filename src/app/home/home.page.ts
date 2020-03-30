import { NavigationExtras, Router } from "@angular/router";
import { RecipeService } from "./../services/recipe.service";
import { Recipe } from "./../utilities-class";
import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {
    this.recipeService
      .getRecipes(
        "filter[order]=createAt DESC&filter[include][0][relation]=image"
      )
      .then(recipes => {
        for (const recipe of recipes) {
          this.recipes.push(recipe);
        }
      })
      .catch(err => console.error(err));
  }

  onClickRecipe(recipe: Recipe) {
    const navigationExtras: NavigationExtras = {
      state: {
        recipe
      }
    };
    console.log(navigationExtras);
    this.router.navigate(["recipe-display"], navigationExtras);
  }
}
