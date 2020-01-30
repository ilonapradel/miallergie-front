import { UsersService } from "./../services/users.service";
import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  username: string;
  email: string;
  password: string;
  password2: string;

  constructor(
    private api: UsersService,
    public toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  register() {
    console.log(this.username, this.email, this.password, this.password2);
    if (this.password === this.password2) {
      this.api.register(this.username, this.email, this.password).then(res => {
        console.log({ resWs: res });
        this.showToast();
        setTimeout(() => {
          this.router.navigate(["/authentication"]);
        }, 2000);
      });
    }
  }

  showToast() {
    this.toastController
      .create({
        message: "Votre compte a bien été créé",
        duration: 2000,
        buttons: [
          {
            side: "start",
            icon: "arrow-Back",
            handler: () => {
              this.router.navigate(["/authentication"]);
            }
          }
        ]
      })
      .then(toast => {
        toast.present();
      });
  }
}
