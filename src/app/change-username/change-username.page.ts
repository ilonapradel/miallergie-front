import { Router } from "@angular/router";
import { UtilitiesClass } from "./../utilities-class";
import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";
import { User } from "../utilities-class";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-change-username",
  templateUrl: "./change-username.page.html",
  styleUrls: ["./change-username.page.scss"],
})
export class ChangeUsernamePage implements OnInit {
  user: User;
  newUsername: string;
  utilities: UtilitiesClass;

  ngOnInit() {
    this.user = this.api.getUser();
  }

  constructor(
    private api: UsersService,
    private toast: ToastController,
    private router: Router
  ) {
    this.utilities = new UtilitiesClass(toast, router);
  }

  changeUsername() {
    if (this.user.username !== this.newUsername) {
      this.api.changeUsername(this.newUsername).then((res) => {
        this.utilities.showToastModification();
        this.utilities.redirectToProfile();
      });
    }
  }
}
