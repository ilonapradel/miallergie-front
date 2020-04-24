import { UsersService } from "./../services/users.service";
import { NavigationExtras, Router } from "@angular/router";
import { RecipeService } from "./../services/recipe.service";
import { Recipe, Preferences } from "./../utilities-class";
import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  recipes: Recipe[] = [];
  toSearch: string = "pref";
  userPreferences: Preferences;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private userService: UsersService
  ) {
    this.userPreferences = userService.returnUserPreferences();
    if (this.toSearch === "pref") {
      this.searchRecipesForUser();
    } else if (this.toSearch === "all") {
      this.searchAllRecipes();
    }
  }

  searchAllRecipes(): void {
    this.recipes = [];
    this.recipeService
      .getRecipes(
        "filter[order]=createAt DESC&filter[include][0][relation]=image"
      )
      .then((recipes) => {
        for (const recipe of recipes) {
          this.recipes.push(recipe);
        }
      })
      .catch((err) => console.error(err));
  }

  searchRecipesForUser(): void {
    this.recipes = [];
    this.recipeService
      .searchRecipesDependingOnPref(this.userPreferences)
      .then((recipes) => {
        for (const recipe of recipes) {
          if (recipe.diets !== undefined) {
            this.recipes.push(recipe);
          }
        }
      })
      .catch((err) => console.error(err));
  }

  onClickRecipe(recipe: Recipe) {
    const navigationExtras: NavigationExtras = {
      state: {
        recipe,
      },
    };
    this.router.navigate(["recipe-display"], navigationExtras);
  }

  segmentChanged(event: any) {
    this.toSearch = event.detail.value;
    if (this.toSearch === "pref") {
      this.searchRecipesForUser();
    } else if (this.toSearch === "all") {
      this.searchAllRecipes();
    }
  }
}
