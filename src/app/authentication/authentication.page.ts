import { AllergyService } from "./../services/allergy.service";
import { ToastController } from "@ionic/angular";
import { UtilitiesClass } from "./../utilities-class";
import { UsersService } from "./../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FoodService } from "../services/food.service";
import { DietService } from "../services/diet.service";
import { IntoleranceService } from "../services/intolerance.service";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.page.html",
  styleUrls: ["./authentication.page.scss"],
})
export class AuthenticationPage implements OnInit {
  email: string = "";
  password: string = "";

  utilities: UtilitiesClass;

  constructor(
    private api: UsersService,
    private router: Router,
    private toast: ToastController,
    private foodService: FoodService,
    private dietService: DietService,
    private intolService: IntoleranceService,
    private allergyService: AllergyService
  ) {
    this.utilities = new UtilitiesClass(toast, router);
  }

  ngOnInit() {}

  connect(email: string, password: string) {
    this.api
      .login(email, password)
      .then(async (user) => {
        this.allergyService.loadAllergies();
        this.foodService.loadFoods();
        this.dietService.loadDiets();
        this.intolService.loadIntolerances();
        await new Promise((r) => setTimeout(r, 1000));

        this.utilities.showToastSimple("Vous êtes connecté !", 2000, "success");
        this.router.navigate(["/home"]);
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
  }
}
