import { UtilitiesClass } from "./../utilities-class";
import { Router, NavigationExtras } from "@angular/router";
import { UsersService } from "./../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Recipe, User } from "../utilities-class";
import { RecipeService } from "../services/recipe.service";
import { ActionSheetController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-user-recipes",
  templateUrl: "./user-recipes.page.html",
  styleUrls: ["./user-recipes.page.scss"],
})
export class UserRecipesPage implements OnInit {
  recipes: Recipe[] = [];
  user: User;
  private utilities: UtilitiesClass;

  constructor(
    private recipeService: RecipeService,
    private userService: UsersService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private toastController: ToastController
  ) {
    this.utilities = new UtilitiesClass(toastController, router);

    this.user = this.userService.getUser();
    this.reload();
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
          },
        },
        {
          text: "Modifier",
          handler: () => {
            this.updateRecipe(recipe);
            this.reload();
          },
        },
        {
          text: "Supprimer",
          role: "destructive",
          handler: () => {
            this.deleteRecipe(recipe)
              .then((recipe: Recipe) => {
                this.utilities.showToastSimple(
                  "Recette suprimée !",
                  1000,
                  "success"
                );
                this.reload();
              })
              .catch((err) => {
                let err_msg = "Error";
                try {
                  err_msg = err.message;
                } catch {}
                try {
                  err_msg = err.error.error.message;
                } catch {}
                this.utilities.showToastSimple(err_msg, 2000, "danger");
              });
          },
        },
        {
          text: "Annuler",
          icon: "close",
          role: "cancel",
        },
      ],
    });

    await actionSheet.present();
  }

  seeRecipe(recipe: Recipe) {
    const navigationExtras: NavigationExtras = {
      state: {
        recipe,
      },
    };
    this.router.navigate(["recipe-display"], navigationExtras);
  }

  updateRecipe(recipe: Recipe) {
    const navigationExtras: NavigationExtras = {
      state: {
        recipe,
      },
    };
    this.router.navigate(["edit-recipe"], navigationExtras);
  }

  deleteRecipe(recipe: Recipe) {
    return this.recipeService.deleteRecipe(recipe);
  }

  reload() {
    const filter =
      "filter[where][ownerUserId]=" +
      this.user.id +
      "&filter[include][0][relation]=image";

    this.recipeService
      .getRecipes(filter)
      .then((recipes) => {
        this.recipes = [];
        for (const recipe of recipes) {
          this.recipes.push(recipe);
        }
      })
      .catch((err) => console.error(err));
  }
}
