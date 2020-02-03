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
  public name: string;
  public quantity?: number;
  public unit?: string;
}

export class Recipe {
  public id: number;
  public name: string;
  public ings: Ingredient[];
  public difficulty: number;
  public diet: string;
  public duration: number;
  public image: string;
  public numberOfPeople: number;
  public stages: string[];
}

export class User {
  public username: string;
  public password?: string;
  public email: string;
  public id: string;
  public preferences: Preferences;
}

export class Preferences {
  public diet: string;
  public allergy: Ingredient[];
  public intolerance: string[];
}
