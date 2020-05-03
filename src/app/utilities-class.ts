import { UsersService } from "./services/users.service";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

export class UtilitiesClass {
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
            },
          },
        ],
      })
      .then((toast) => {
        toast.present();
      });
  }

  showToastSimple(text: string, duration: number, color: string) {
    this.toastController
      .create({
        message: text,
        duration,
        color,
      })
      .then((toast) => {
        toast.present();
      });
  }

  disconnect() {
    this.showToastSimple("Vous avez été déconnecté !", 4000, "danger");
    setTimeout(() => {
      this.router.navigate(["/authentication"]);
    }, 1000);
  }

  redirectToProfile() {
    setTimeout(() => {
      this.router.navigate(["/profile"]);
    }, 2000);
  }
}

export class Ingredient {
  public id: number;
  public foodId: string;
  public food?: Food;
  public quantity?: number = 1;
  public unit?: string = "g";
}

export class Food {
  public id: string = "";
  public name: string = "";
  public allergies: Allergy[] = [];
  public intolerances: Intolerance[] = [];
}

export class Recipe {
  public id: string;
  public name: string;
  public ingredients: Ingredient[] = [];
  public difficulty: number = 3;
  public diets?: Diet[];
  public duration: number = 15;
  public imageId?: string;
  public image?: File = new File();
  public numberOfPeople: number = 1;
  public stages: string[] = ["", "", "", "", ""];
  public type: string;
  public intolerances: Intolerance[];
  public allergies: Allergy[];
}

export class File {
  public id?: string;
  public name: string = "";
  public type: string = "";
  public path: string = "";
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
  public preferences: Preferences = new Preferences();
  public nonRegisteredFriends?: Friend[] = [];
  public registeredFriends?: User[] = [];
}

export class Preferences {
  public diets?: Diet[] = [];
  public allergies?: Allergy[] = [];
  public intolerances?: Intolerance[] = [];
}

export class Friend {
  public preferences: Preferences = new Preferences();
  public surname: string;
}

export class Allergy {
  public id: string;
  public name: string;
}

export class Intolerance {
  public id: string;
  public name: string;
}

export const ApiUrl: string = "http://miallergie.freeboxos.fr:8080/";
