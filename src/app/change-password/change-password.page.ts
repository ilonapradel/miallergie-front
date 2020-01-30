import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";
import { User, UtilitiesClass } from "../utilities-class";
import { ToastController } from "@ionic/angular";

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

  constructor(private api: UsersService, private toast: ToastController) {
    this.utilities = new UtilitiesClass(toast);
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
