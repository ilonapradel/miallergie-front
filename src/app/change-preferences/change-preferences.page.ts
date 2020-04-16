import { ComponentsModule } from "./../components/components.module";
import { Preferences, UtilitiesClass, Diet } from "./../utilities-class";
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Ingredient } from "../utilities-class";
import { UsersService } from "../services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-change-preferences",
  templateUrl: "./change-preferences.page.html",
  styleUrls: ["./change-preferences.page.scss"],
})
export class ChangePreferencesPage implements OnInit {
  userPreferences: Preferences;

  constructor(private api: UsersService, public router: Router) {
    this.userPreferences = api.getUserPreferences();
  }

  ngOnInit() {}

  savePreferences() {
    //On renvoie vers l'api & le back (TODO)
    console.log("save");
    console.log({ pref: this.userPreferences });
    this.api.saveUserPreferences(this.userPreferences);
    this.router.navigate(["/profile"]);
  }

  onChangeDiets(diets: Diet[]) {
    this.userPreferences.diets = diets;
  }

  onChangeAllergies(allergies: Ingredient[]) {
    this.userPreferences.allergy = allergies;
  }

  onChangeIntolerances(intolerances: Ingredient[]) {
    this.userPreferences.intolerance = intolerances;
  }
}
