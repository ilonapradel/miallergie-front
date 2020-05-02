import { RecipeService } from "src/app/services/recipe.service";
import { FoodService } from "./../services/food.service";
import { Food, Recipe } from "./../utilities-class";
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Ingredient, Diet } from "../utilities-class";
import { NavigationExtras, Router } from "@angular/router";
import {
  SearchRequest,
  SearchRequestWhereOr,
  SearchRequestInclude,
} from "../search-utilities";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  diff_name: Array<string> = [
    "warning",
    "warning",
    "warning",
    "light",
    "light",
  ];

  @ViewChild("ingredientComponent", { static: false })
  ingredientComponent: IonicSelectableComponent;

  @ViewChild("dietComponent", { static: false })
  dietComponent: IonicSelectableComponent;

  rangeValue: { lower: number; upper: number } = { lower: 20, upper: 100 };

  searchText = "";
  types: string[] = [];
  diets: Diet[] = [];
  difficulty = 3;

  foodOptions: Food[] = [];
  selectedFoods: Food[] = [];

  constructor(
    private foodService: FoodService,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  // TODO : Use async search for ingredientComponent https://stackblitz.com/edit/ionic-selectable-on-search?file=pages%2Fhome%2Fhome.ts

  ngOnInit() {
    this.foodService
      .getFoods()
      .then((foods) => (this.foodOptions = foods))
      .catch((err) => console.error(err));
  }

  changeValue(value: { lower: number; upper: number }) {
    this.rangeValue = value;
  }

  onIngredientChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.selectedFoods = event.value;
  }

  deleteIngredient(food: Food) {
    this.selectedFoods.splice(this.selectedFoods.indexOf(food), 1);
    this.ingredientComponent.confirm();
  }

  clickOnSearch() {
    const request = new SearchRequest();
    const where = request.where;
    const include = request.include;

    if (this.searchText != "") {
      where.name = {
        like: ".*" + this.searchText + ".*",
      };
    }
    if (this.types && this.types.length > 0) {
      const tab: SearchRequestWhereOr[] = [];
      for (const type of this.types) {
        tab.push({ type });
      }
      where.or = tab;
    }

    if (this.selectedFoods && this.selectedFoods.length > 0) {
      const relationRequest = new SearchRequestInclude();
      relationRequest.relation = "ingredients";

      const tab: SearchRequestWhereOr[] = [];
      for (const selectedFood of this.selectedFoods) {
        const newR: SearchRequestWhereOr = {
          foodId: selectedFood.id,
        };
        tab.push(newR);
      }
      relationRequest.scope.where.and = tab;
      include.push(relationRequest);
    }

    if (this.diets && this.diets.length > 0) {
      const relationRequest = new SearchRequestInclude();
      relationRequest.relation = "diets";

      const tab: SearchRequestWhereOr[] = [];
      for (const diet of this.diets) {
        const newR: SearchRequestWhereOr = {
          dietId: diet.id,
        };
        tab.push(newR);
      }
      relationRequest.scope.where.or = tab;
      include.push(relationRequest);
    }

    const relationImageRequest = new SearchRequestInclude();
    relationImageRequest.relation = "image";
    include.push(relationImageRequest);

    where.duration = {
      between: [this.rangeValue.lower, this.rangeValue.upper],
    };

    where.difficulty = {
      lte: this.difficulty,
    };
    this.recipeService
      .getRecipes("filter=" + JSON.stringify(request))
      .then((recipes) => {
        this.goToSearchResultsPage(recipes);
      })
      .catch((err) => console.error(err));
  }

  goToSearchResultsPage(recipes: Recipe[]) {
    const navigationExtras: NavigationExtras = {
      state: {
        recipes,
      },
    };
    this.router.navigate(["search-results"], navigationExtras);
  }

  onChangeDiets(diets: Diet[]) {
    this.diets = diets;
  }

  clickOnDifficulty(position: number) {
    for (const num of [0, 1, 2, 3, 4]) {
      if (position >= num) {
        this.diff_name[num] = "warning";
      } else {
        this.diff_name[num] = "light";
      }
    }
    this.difficulty = position;
  }
}
