import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";
import { User, UtilitiesClass } from "../utilities-class";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.page.html",
  styleUrls: ["./change-password.page.scss"]
})
export class ChangePasswordPage implements OnInit {
  user: User;
  newPassword: string;
  newPasswordConfirm: string;
  oldPassword: string;
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

  changePassword() {
    if (this.newPassword === this.newPasswordConfirm) {
      this.api.changePassword(this.newPassword, this.oldPassword).then(res => {
        this.utilities.showToastModification();
        this.utilities.redirectToProfile();
      });
    }
  }
}
