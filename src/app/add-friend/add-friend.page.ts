import {
  Friend,
  User,
  Allergy,
  Intolerance,
  Diet,
  UtilitiesClass,
} from "./../utilities-class";
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Preferences } from "../utilities-class";
import { UsersService } from "../services/users.service";
import { Router } from "@angular/router";
import { isUndefined } from "util";
import { ToastController } from "@ionic/angular";

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

  preferences: Preferences = new Preferences();

  newFriend: Friend = new Friend();
  newUserFriend: User = new User();
  utilities: UtilitiesClass;

  constructor(
    private api: UsersService,
    public router: Router,
    private toast: ToastController
  ) {
    this.utilities = new UtilitiesClass(toast, router);
    this.preferences = {
      diets: [],
      allergies: [],
      intolerances: [],
    };
  }

  ngOnInit() {}

  async saveNewUserFriend() {
    if (isUndefined(this.newUserFriend.email)) {
      this.utilities.showToastSimple(
        "L'email de votre ami est obligatoire s'il est enregistré !",
        2000,
        "danger"
      );
      return;
    }
    let test = await this.api.addRegisteredFriend(this.newUserFriend);
    if (!test) {
      this.utilities.showToastSimple(
        "Nous n'avons pas trouvé votre ami :(",
        2000,
        "danger"
      );
      return;
    } else {
      this.api.reloadUserFriends().then(() => {
        this.utilities.showToastSimple(
          "Votre ami(e) a été ajouté!",
          1000,
          "success"
        );
        this.router.navigate(["/friend"]);
      });
    }
  }

  saveNewFriend() {
    if (isUndefined(this.newFriend.surname)) {
      this.utilities.showToastSimple(
        "Le surnom de votre ami est obligatoire !",
        2000,
        "danger"
      );
      return;
    }
    this.newFriend.preferences = this.preferences;

    this.api.addNonRegisteredFriend(this.newFriend).then(() => {
      this.api.reloadUserFriends().then(() => {
        this.utilities.showToastSimple(
          "Votre ami(e) a été ajouté!",
          1000,
          "success"
        );
        this.router.navigate(["/friend"]);
      });
    });
  }

  onChangeDiets(diets: Diet[]) {
    this.preferences.diets = diets;
  }

  onChangeAllergies(allergies: Allergy[]) {
    this.preferences.allergies = allergies;
  }

  onChangeIntolerances(intolerances: Intolerance[]) {
    this.preferences.intolerances = intolerances;
  }
}
