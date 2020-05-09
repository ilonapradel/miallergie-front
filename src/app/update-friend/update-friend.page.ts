import { ToastController } from "@ionic/angular";
import { UsersService } from "./../services/users.service";
import { Diet, Intolerance, UtilitiesClass } from "src/app/utilities-class";
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

  utilities: UtilitiesClass;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: UsersService,
    private toast: ToastController
  ) {
    this.utilities = new UtilitiesClass(toast, router);
  }

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
    console.log(this);
    this.api
      .saveNonRegisteredFriendPreferences(this.userPref, this.friend.id)
      .then(() => {
        this.utilities.showToastSimple("Modifié !", 1000, "succes");
        this.router.navigate(["/friend"]);
      });
  }

  onChangeDiets(diets: Diet[]) {
    this.userPref.diets = diets;
  }

  onChangeAllergies(allergies: Allergy[]) {
    this.userPref.allergies = allergies;
  }

  onChangeIntolerances(intolerances: Intolerance[]) {
    this.userPref.intolerances = intolerances;
  }
}
