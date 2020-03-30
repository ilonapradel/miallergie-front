import { Router, NavigationExtras } from "@angular/router";
import { UsersService } from "./../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Recipe, User } from "../utilities-class";
import { RecipeService } from "../services/recipe.service";
import { ActionSheetController } from "@ionic/angular";

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
    private userService: UsersService,
    private router: Router,
    public actionSheetController: ActionSheetController
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

  async handleClickOnRecipe(recipe: Recipe) {
    const actionSheet = await this.actionSheetController.create({
      header: "Actions",
      buttons: [
        {
          text: "Voir",
          handler: () => {
            this.seeRecipe(recipe);
          }
        },
        {
          text: "Modifier",
          handler: () => {
            this.updateRecipe(recipe);
          }
        },
        {
          text: "Supprimer",
          role: "destructive",
          handler: () => {
            this.deleteRecipe(recipe);
          }
        },
        {
          text: "Annuler",
          icon: "close",
          role: "cancel"
        }
      ]
    });

    await actionSheet.present();
  }

  seeRecipe(recipe: Recipe) {
    const navigationExtras: NavigationExtras = {
      state: {
        recipe
      }
    };
    this.router.navigate(["recipe-display"], navigationExtras);
  }

  updateRecipe(recipe: Recipe) {
    const navigationExtras: NavigationExtras = {
      state: {
        recipe
      }
    };
    this.router.navigate(["edit-recipe"], navigationExtras);
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
  }
}
