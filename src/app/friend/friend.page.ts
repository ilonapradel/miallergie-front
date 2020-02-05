import { UsersService } from "./../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Friend, User } from "../utilities-class";

@Component({
  selector: "app-friend",
  templateUrl: "./friend.page.html",
  styleUrls: ["./friend.page.scss"]
})
export class FriendPage implements OnInit {
  myNonRegFriends: Friend[];
  myRegFriends: User[];

  constructor(private api: UsersService) {
    api.init();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.myNonRegFriends = this.api.getUser().nonRegisteredFriends;
    this.myRegFriends = this.api.getUser().registeredFriends;

    console.log(this.myNonRegFriends);
    console.log(this.myRegFriends);
  }
}
