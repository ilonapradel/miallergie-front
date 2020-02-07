import { FoodService } from "./../services/food.service";
import { DietService } from "./../services/diet.service";
import { Recipe, Diet, Food } from "./../utilities-class";
import {
  RecipeService,
  ApiRecipe,
  ApiIngredient
} from "./../services/recipe.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Ingredient } from "../utilities-class";

@Component({
  selector: "app-add-recipe",
  templateUrl: "./add-recipe.page.html",
  styleUrls: ["./add-recipe.page.scss"]
})
export class AddRecipePage implements OnInit {
  //const
  unites: string[] = ["Cuillère à soupe", "g", "cL", "pincées"];
  recipe: Recipe = new Recipe(null);
  dietOptions: Diet[] = [];
  foodOptions: Food[] = [];
  selectedFoodOptions: Food[] = [];

  @ViewChild("ingredientComponent", { static: false })
  ingredientComponent: IonicSelectableComponent;

  diff_name: Array<string> = [
    "warning",
    "warning",
    "warning",
    "light",
    "light"
  ];

  constructor(
    private recipeService: RecipeService,
    private dietService: DietService,
    private foodService: FoodService
  ) {
    this.dietService
      .getDiets()
      .then((diets: Diet[]) => {
        this.dietOptions = diets;
      })
      .catch(err => console.log(err));

    this.foodService
      .getFoods()
      .then(foods => (this.foodOptions = foods))
      .catch(err => console.error(err));
  }

  ngOnInit() {}

  onIngredientChange(event: {
    component: IonicSelectableComponent;
    value: Food[];
  }) {
    for (const food of event.value) {
      let ingredient = new Ingredient(null);
      ingredient.food = food;
      this.recipe.ingrediants.push(ingredient);
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  clickOnDifficulty(position: number) {
    for (const num of [0, 1, 2, 3, 4]) {
      if (position >= num) {
        this.diff_name[num] = "warning";
      } else {
        this.diff_name[num] = "light";
      }
    }
    this.recipe.difficulty = position;
  }

  clickOnAdd(recipe: Recipe) {
    console.log({ recipe });
    recipe.name = "test"; //TODO: add input to change the recipe name
    this.recipeService
      .addRecipe(recipe)
      .then((savedRecipe: ApiRecipe) => {
        console.log(savedRecipe);
        let saveIngrediants: Promise<ApiIngredient>[] = [];
        for (const ingrediant of this.recipe.ingrediants) {
          saveIngrediants.push(
            this.recipeService.addIngrediantToRecipe(savedRecipe, ingrediant)
          );
        }

        Promise.all(saveIngrediants)
          .then(savedIngrediants => console.log("End Saving", saveIngrediants))
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
      });
  }

  onChangeNbStages(event: { detail: { value: number } }) {
    console.log(event);
    if (event && event.detail && event.detail.value) {
      let nb = event.detail.value;
      if (nb > this.recipe.stages.length) {
        for (let i = this.recipe.stages.length; i < nb; i++) {
          this.recipe.stages.push("");
        }
      } else {
        this.recipe.stages = this.recipe.stages.slice(0, event.detail.value);
      }
    }
  }
}
