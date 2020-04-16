import { Friend, User, Allergy, Intolerance } from "./../utilities-class";
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Ingredient, Preferences } from "../utilities-class";
import { UsersService } from "../services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-friend",
  templateUrl: "./add-friend.page.html",
  styleUrls: ["./add-friend.page.scss"],
})
export class AddFriendPage implements OnInit {
  @ViewChild("allergyComponent", { static: false })
  allergyComponent: IonicSelectableComponent;

  @ViewChild("intoleranceComponent", { static: false })
  intoleranceComponent: IonicSelectableComponent;

  possibleAllergies: Allergy[];

  possibleIntolerances: Intolerance[];
  preferences: Preferences = new Preferences();

  newFriend: Friend = new Friend();
  newUserFriend: User = new User();

  constructor(private api: UsersService, public router: Router) {
    this.possibleAllergies = [];

    this.possibleIntolerances = [];

    this.preferences = {
      diets: [],
      allergies: [],
      intolerances: [],
    };
  }

  ngOnInit() {}

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
