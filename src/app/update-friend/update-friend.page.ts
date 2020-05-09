import { Diet, Intolerance } from "src/app/utilities-class";
import { Preferences, Allergy } from "./../utilities-class";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Friend, User } from "../utilities-class";

@Component({
  selector: "app-update-friend",
  templateUrl: "./update-friend.page.html",
  styleUrls: ["./update-friend.page.scss"],
})
export class UpdateFriendPage implements OnInit {
  public friend: Friend;
  public user: User;
  public amAFriend: boolean = false;
  public name: string;
  public userPref: Preferences;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.friend) {
          this.friend = this.router.getCurrentNavigation().extras.state.friend;
          this.amAFriend = true;
        }
        if (this.router.getCurrentNavigation().extras.state.user) {
          this.user = this.router.getCurrentNavigation().extras.state.user;
        }
      }
    });

    if (this.amAFriend) {
      this.name = this.friend.surname;
      this.userPref = this.friend.preferences;
    } else {
      this.name = this.user.username;
      this.userPref = this.user.preferences;
    }
  }

  savePreferences() {
    //this.router.navigate(["/friend"]);
    console.log(this.userPref);
  }

  onChangeDiets(diets: Diet[]) {
    console.log({ step: "onChangeDiets", diets: diets });
    this.userPref.diets = diets;
  }

  onChangeAllergies(allergies: Allergy[]) {
    this.userPref.allergies = allergies;
  }

  onChangeIntolerances(intolerances: Intolerance[]) {
    this.userPref.intolerances = intolerances;
  }
}
