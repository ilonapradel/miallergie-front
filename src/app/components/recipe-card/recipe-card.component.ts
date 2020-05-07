import { Preferences } from "./../../utilities-class";
import { UsersService } from "./../../services/users.service";
import { Router } from "@angular/router";
import { NavigationExtras } from "@angular/router";
import { Recipe } from "../../utilities-class";
import { Component, OnInit, Input } from "@angular/core";
import { ApiUrl } from "../../utilities-class";
import { isNullOrUndefined } from "util";
@Component({
  selector: "app-recipe-card",
  templateUrl: "./recipe-card.component.html",
  styleUrls: ["./recipe-card.component.scss"],
})
export class RecipeCardComponent implements OnInit {
  @Input("recipe")
  recipe: Recipe;

  server: string = ApiUrl;

  userPref: Preferences;

  icon: string = "checkmark-circle-outline";
  color: string = "success";

  constructor(userService: UsersService) {
    this.userPref = userService.returnUserPreferences();
  }

  ngOnInit() {
    this.getCompatibilityOfRecipe();
  }

  getCompatibilityOfRecipe(): void {
    this.icon = "checkmark-circle-outline";
    this.color = "success";

    if (!isNullOrUndefined(this.recipe.diets)) {
      for (let diet of this.recipe.diets) {
        if (!this.findDietById(diet.id)) {
          this.icon = "close-circle-outline";
          this.color = "danger";
        }
      }
    } else {
      this.color = "warning";
    }
    if (!isNullOrUndefined(this.recipe.allergies)) {
      for (const allergy of this.recipe.allergies) {
        if (this.userPref.allergies.indexOf(allergy) === -1) {
          this.icon = "close-circle-outline";
          this.color = "danger";
        }
      }
    }
  }

  findDietById(id: string): boolean {
    for (let diet of this.userPref.diets) {
      if (diet.id === id) {
        return true;
      }
    }

    return false;
  }
}
