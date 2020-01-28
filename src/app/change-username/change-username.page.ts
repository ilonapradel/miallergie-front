import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-change-username",
  templateUrl: "./change-username.page.html",
  styleUrls: ["./change-username.page.scss"]
})
export class ChangeUsernamePage implements OnInit {
  oldUsername: string = "test";
  newUsername: string;

  ngOnInit() {}

  constructor(private api: UsersService) {}

  changeUsername() {
    console.log(this.oldUsername, this.newUsername);
    // TODO : faire le lien avec l'API
    // if (this.oldUsername === this.newUsername)
    // this.api.register(this.username, this.email, this.password).then(res => {
    //   console.log({ resWs: res });
    // });
  }
}
