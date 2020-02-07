import { ApiFood } from "./services/ingrediant.service";
import { ApiRecipe, ApiIngredient } from "./services/recipe.service";
import { UsersService } from "./services/users.service";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

export class UtilitiesClass {
  private api: UsersService;

  constructor(public toastController: ToastController, public router: Router) {}

  showToastModification() {
    this.toastController
      .create({
        message: "Modification effectuée",
        duration: 2000,
        buttons: [
          {
            side: "start",
            icon: "arrow-Back",
            handler: () => {
              this.router.navigate(["/profile"]);
            }
          }
        ]
      })
      .then(toast => {
        toast.present();
      });
  }

  redirectToProfile() {
    setTimeout(() => {
      this.router.navigate(["/profile"]);
    }, 2000);
  }
}

export class Ingredient {
  public id: number;
  public food?: Food = new Food(null);
  public quantity?: number = 1;
  public unit?: string = "g";

  constructor(ingrediant: ApiIngredient | null) {
    if (ingrediant) {
      this.id = ingrediant.id;
      this.quantity = ingrediant.quantity;
      this.unit = ingrediant.unit;
    }
  }
}

export class Food {
  id: string = "";
  name: string = "";

  constructor(food: ApiFood | null) {
    if (food) {
      this.id = food.id;
      this.name = food.name;
    }
  }
}

export class Recipe {
  public id: string;
  public name: string = "";
  public ingrediants: Ingredient[] = [];
  public difficulty: number = 3;
  public diet?: Diet = new Diet();
  public duration: number = 15;
  public image: string;
  public numberOfPeople: number = 1;
  public stages: string[] = ["", "", "", "", ""];

  constructor(recipe: ApiRecipe | null) {
    if (recipe) {
      this.id = recipe.id;
      this.name = recipe.name;
      this.diet.id = recipe.dietId;
      this.difficulty = recipe.difficulty;
      this.duration = recipe.duration;
      this.numberOfPeople = recipe.numberOfPeople;
      this.stages = recipe.stages;
    }
  }
}

export class Diet {
  id: string;
  name: string;
}

export class User {
  public username: string;
  public password?: string;
  public email: string;
  public id?: string;
  public preferences: Preferences;
  public nonRegisteredFriends?: Friend[];
  public registeredFriends?: User[];
}

export class Preferences {
  public diet: string;
  public allergy?: Ingredient[];
  public intolerance?: string[];
}

export class Friend {
  public preferences: Preferences;
  public surname: string;
}
