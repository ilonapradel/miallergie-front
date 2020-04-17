import { ToastController } from "@ionic/angular";
import { UtilitiesClass } from "./../utilities-class";
import { UsersService } from "./../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.page.html",
  styleUrls: ["./authentication.page.scss"],
})
export class AuthenticationPage implements OnInit {
  email: string;
  password: string;

  utilities: UtilitiesClass;

  constructor(
    private api: UsersService,
    private router: Router,
    private toast: ToastController
  ) {
    this.utilities = new UtilitiesClass(toast, router);
  }

  ngOnInit() {}

  connect(email: string, password: string) {
    this.api
      .login(email, password)
      .then((user) => {
        this.utilities.showToastSimple("Vous êtes connecté !", 2000, "success");
        this.router.navigate(["/home"]);
      })
      .catch((err) => {
        let err_msg = "Error";
        try {
          err_msg = err.message;
        } catch {}
        try {
          err_msg = err.error.error.message;
        } catch {}

        this.utilities.showToastSimple(err_msg, 2000, "danger");
      });
  }
}
