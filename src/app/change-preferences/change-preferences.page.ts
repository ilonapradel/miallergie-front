import { ComponentsModule } from "./../components/components.module";
import {
  Preferences,
  UtilitiesClass,
  Diet,
  Allergy,
  Intolerance,
} from "./../utilities-class";
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
    this.userPreferences = api.returnUserPreferences();
  }

  ngOnInit() {}

  savePreferences() {
    this.api.saveUserPreferences(this.userPreferences);
    this.router.navigate(["/profile"]);
  }

  onChangeDiets(diets: Diet[]) {
    this.userPreferences.diets = diets;
  }

  onChangeAllergies(allergies: Allergy[]) {
    this.userPreferences.allergies = allergies;
  }

  onChangeIntolerances(intolerances: Intolerance[]) {
    this.userPreferences.intolerances = intolerances;
  }
}
