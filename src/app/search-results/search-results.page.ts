import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../utilities-class";
import { NavigationExtras, Router, ActivatedRoute } from "@angular/router";
import { RecipeService } from "../services/recipe.service";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.page.html",
  styleUrls: ["./search-results.page.scss"],
})
export class SearchResultsPage implements OnInit {
  recipes: Recipe[];
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.recipes) {
          this.recipes = this.router.getCurrentNavigation().extras.state.recipes;
        }
      }
    });
    console.log(this.recipes);
  }

  onClickRecipe(recipe: Recipe) {
    const navigationExtras: NavigationExtras = {
      state: {
        recipe,
      },
    };
    this.router.navigate(["recipe-display"], navigationExtras);
  }
}
