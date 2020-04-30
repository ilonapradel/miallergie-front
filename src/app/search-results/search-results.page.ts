import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../utilities-class";
import { NavigationExtras, Router } from "@angular/router";
import { RecipeService } from "../services/recipe.service";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.page.html",
  styleUrls: ["./search-results.page.scss"],
})
export class SearchResultsPage implements OnInit {
  @Input("recipes")
  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {}

  onClickRecipe(recipe: Recipe) {
    const navigationExtras: NavigationExtras = {
      state: {
        recipe,
      },
    };
    this.router.navigate(["recipe-display"], navigationExtras);
  }
}
