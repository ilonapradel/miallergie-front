import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { UtilitiesClass, User } from "../utilities-class";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-change-email",
  templateUrl: "./change-email.page.html",
  styleUrls: ["./change-email.page.scss"]
})
export class ChangeEmailPage implements OnInit {
  user: User;
  newEmail: string;
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

  changeEmail() {
    if (this.newEmail !== this.user.email) {
      this.api.changeEmail(this.newEmail).then(res => {
        this.utilities.showToastModification();
        this.utilities.redirectToProfile();
      });
    }
  }
}
