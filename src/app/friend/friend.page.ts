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
    this.myNonRegFriends = api.getUser().nonRegisteredFriends;
    this.myRegFriends = api.getUser().registeredFriends;
  }

  ngOnInit() {}
}
