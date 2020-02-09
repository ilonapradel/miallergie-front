import { UsersService } from "./../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.page.html",
  styleUrls: ["./authentication.page.scss"]
})
export class AuthenticationPage implements OnInit {
  email: string = "admin1@admin.fr";
  password: string = "admin1";

  constructor(private api: UsersService, private router: Router) {}

  ngOnInit() {}

  connect(email: string, password: string) {
    console.log(email, password);
    this.api.login(email, password).then(user => {
      this.router.navigate(["/home"]);
    });
  }
}
