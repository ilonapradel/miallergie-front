import { UsersService } from "./../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Recipe, User } from "../utilities-class";
import { RecipeService } from "../services/recipe.service";

@Component({
  selector: "app-user-recipes",
  templateUrl: "./user-recipes.page.html",
  styleUrls: ["./user-recipes.page.scss"]
})
export class UserRecipesPage implements OnInit {
  recipes: Recipe[] = [];
  user: User;

  constructor(
    private recipeService: RecipeService,
    private userService: UsersService
  ) {
    this.user = this.userService.getUser();

    const filter = "?filter[where][ownerUserId]=" + this.user.id;

    this.recipeService
      .getRecipes(filter)
      .then(recipes => {
        for (const recipe of recipes) {
          this.recipes.push(recipe);
        }
      })
      .catch(err => console.error(err));
  }

  ngOnInit(): void {}
}
