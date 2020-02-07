import { IngrediantService } from "./../services/ingrediant.service";
import { FoodService } from "./../services/food.service";
import { Food } from "./../utilities-class";
import { RecipeService } from "./../services/recipe.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Recipe, Ingredient } from "../utilities-class";

@Component({
  selector: "app-recipe-display",
  templateUrl: "./recipe-display.page.html",
  styleUrls: ["./recipe-display.page.scss"]
})
export class RecipeDisplayPage implements OnInit {
  recipe: Recipe = new Recipe(null);

  difficulty_color: Array<string> = [
    "warning",
    "light",
    "light",
    "light",
    "light"
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private ingrediantService: IngrediantService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.recipe) {
          this.recipe = this.router.getCurrentNavigation().extras.state.recipe;

          try {
            let ingrediants = await this.recipeService.getIngrediantFromRecipe(
              this.recipe
            );
            for (const ingrediant of ingrediants) {
              let newIngrediant = new Ingredient(ingrediant);
              let newFood = new Food(null);
              try {
                newFood = new Food(
                  await this.ingrediantService.getFoodOfIngrediant(
                    newIngrediant
                  )
                );
              } catch (error) {
                console.error(error);
              }
              newIngrediant.food = newFood;
              this.recipe.ingrediants.push(newIngrediant);
            }
          } catch (error) {
            console.error(error);
          }

          /* this.recipeService
            .getIngrediantFromRecipe(this.recipe)
            .then(ingrediants => {
              console.log(ingrediants);
              for (const ingrediant of ingrediants) {     
                let newIngrediant = new Ingredient(ingrediant);
                this.recipe.ingrediants.push(new Ingredient(ingrediant));
              }
            }); */
        }
      }
    });

    for (const num of [0, 1, 2, 3, 4]) {
      if (this.recipe.difficulty > num) {
        this.difficulty_color[num] = "warning";
      } else {
        this.difficulty_color[num] = "light";
      }
    }
  }
}
