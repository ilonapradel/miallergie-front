import { Friend, User } from "./../utilities-class";
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Ingredient, Preferences } from "../utilities-class";
import { UsersService } from "../services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-friend",
  templateUrl: "./add-friend.page.html",
  styleUrls: ["./add-friend.page.scss"]
})
export class AddFriendPage implements OnInit {
  @ViewChild("allergyComponent", { static: false })
  allergyComponent: IonicSelectableComponent;

  @ViewChild("intoleranceComponent", { static: false })
  intoleranceComponent: IonicSelectableComponent;

  possibleAllergies: Ingredient[];

  possibleIntolerances: string[];
  preferences: Preferences = new Preferences();

  newFriend: Friend = new Friend();
  newUserFriend: User = new User();

  constructor(private api: UsersService, public router: Router) {
    this.possibleAllergies = [
     
    ];

    this.possibleIntolerances = ["glucose", "gluten", "lactose", "fructose"];

    this.preferences = {
      diet: "vegan",
      allergy: [
        
      ],
      intolerance: ["lucas", "lactose"]
    };
  }

  ngOnInit() {}

  onAllergyChange(event: { component: IonicSelectableComponent; value: any }) {
    this.preferences.allergy = event.value;
  }

  deleteAllergy(ingredient: Ingredient) {
    this.preferences.allergy.splice(
      this.preferences.allergy.indexOf(ingredient),
      1
    );
    console.log(this.preferences.allergy);
    this.allergyComponent.confirm();
  }

  onIntoleranceChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.preferences.intolerance = event.value;
  }

  deleteIntolerance(intolerance: string) {
    this.preferences.intolerance.splice(
      this.preferences.intolerance.indexOf(intolerance),
      1
    );
    console.log(this.preferences.intolerance);
    this.intoleranceComponent.confirm();
  }

  saveNewUserFriend() {
    this.api.addRegisteredFriend(this.newUserFriend);
    this.router.navigate(["/friend"]);
  }

  saveNewFriend() {
    this.newFriend.preferences = this.preferences;

    this.api.addNonRegisteredFriend(this.newFriend);
    this.router.navigate(["/friend"]);
  }
}
