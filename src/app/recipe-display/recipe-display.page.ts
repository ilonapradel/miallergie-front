import { isNullOrUndefined } from "util";
import { DietService } from "src/app/services/diet.service";
import { IngredientService } from "./../services/ingredient.service";
import { FoodService } from "./../services/food.service";
import { Food } from "./../utilities-class";
import { RecipeService } from "./../services/recipe.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Recipe, Ingredient } from "../utilities-class";
import { ApiUrl } from "../utilities-class";

@Component({
  selector: "app-recipe-display",
  templateUrl: "./recipe-display.page.html",
  styleUrls: ["./recipe-display.page.scss"],
})
export class RecipeDisplayPage implements OnInit {
  recipe: Recipe = new Recipe();
  server: string = ApiUrl;

  difficulty_color: Array<string> = [
    "warning",
    "light",
    "light",
    "light",
    "light",
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private dietService: DietService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.recipe) {
          this.recipe = this.router.getCurrentNavigation().extras.state.recipe;

          //getting diet
          if (
            isNullOrUndefined(this.recipe.diets) ||
            this.recipe.diets.length === 0
          ) {
            this.recipeService.getDietsFromRecipe(this.recipe);
          }

          //getting ingrediants with their food
          try {
            let ingredients = await this.recipeService.getIngredientFromRecipe(
              this.recipe
            );
            this.recipe.ingredients = [];
            for (const ingredient of ingredients) {
              let newFood = new Food();
              try {
                newFood = await this.ingredientService.getFoodOfIngredient(
                  ingredient
                );
              } catch (error) {
                console.error(error);
              }
              ingredient.food = newFood;
              this.recipe.ingredients.push(ingredient);
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    });

    this.displayDifficulty();
  }

  displayDifficulty() {
    for (const num of [0, 1, 2, 3, 4]) {
      if (this.recipe.difficulty > num) {
        this.difficulty_color[num] = "warning";
      } else {
        this.difficulty_color[num] = "light";
      }
    }
  }
}
