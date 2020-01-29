import { UtilitiesClass } from "./../utilities-class";
import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";
import { User } from "../utilities-class";

@Component({
  selector: "app-change-username",
  templateUrl: "./change-username.page.html",
  styleUrls: ["./change-username.page.scss"]
})
export class ChangeUsernamePage implements OnInit {
  user: User;
  newUsername: string;

  ngOnInit() {}

  constructor(private api: UsersService, private utilities: UtilitiesClass) {}

  changeUsername() {
    console.log(this.user.username, this.newUsername);
    if (this.user.username !== this.newUsername) {
      this.api.changeUsername(this.newUsername).then(res => {
        this.utilities.showToastModification();
        this.utilities.redirectToProfile();
      });
    }
  }
}
