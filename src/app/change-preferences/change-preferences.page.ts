import { Preferences, UtilitiesClass } from "./../utilities-class";
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Ingredient } from "../utilities-class";
import { UsersService } from "../services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-change-preferences",
  templateUrl: "./change-preferences.page.html",
  styleUrls: ["./change-preferences.page.scss"]
})
export class ChangePreferencesPage implements OnInit {
  @ViewChild("allergyComponent", { static: false })
  allergyComponent: IonicSelectableComponent;

  @ViewChild("intoleranceComponent", { static: false })
  intoleranceComponent: IonicSelectableComponent;

  possibleAllergies: Ingredient[];

  possibleIntolerances: string[];
  userPreferences: Preferences;

  constructor(private api: UsersService, public router: Router) {
    this.possibleAllergies = [
      { id: 1, name: "Tomate" },
      { id: 2, name: "Oignon" },
      { id: 3, name: "Ananas" },
      { id: 4, name: "Oeufs" }
    ];

    this.possibleIntolerances = ["glucose", "gluten", "lactose", "fructose"];

    this.userPreferences = api.getUserPreferences();
  }

  ngOnInit() {}

  onAllergyChange(event: { component: IonicSelectableComponent; value: any }) {
    this.userPreferences.allergy = event.value;
  }

  deleteAllergy(ingredient: Ingredient) {
    this.userPreferences.allergy.splice(
      this.userPreferences.allergy.indexOf(ingredient),
      1
    );
    console.log(this.userPreferences.allergy);
    this.allergyComponent.confirm();
  }

  onIntoleranceChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.userPreferences.intolerance = event.value;
  }

  deleteIntolerance(intolerance: string) {
    this.userPreferences.intolerance.splice(
      this.userPreferences.intolerance.indexOf(intolerance),
      1
    );
    console.log(this.userPreferences.intolerance);
    this.intoleranceComponent.confirm();
  }

  savePreferences() {
    //On renvoie vers l'api & le back (TODO)
    this.api.changeUserPreferences(this.userPreferences);
    this.router.navigate(["/profile"]);
  }
}
