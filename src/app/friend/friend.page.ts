import { UsersService } from "./../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Friend, User } from "../utilities-class";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-friend",
  templateUrl: "./friend.page.html",
  styleUrls: ["./friend.page.scss"],
})
export class FriendPage implements OnInit {
  myNonRegFriends: Friend[];
  myRegFriends: User[];

  constructor(private api: UsersService, private router: Router) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.api.loadFriends();
    this.myNonRegFriends = this.api.getUser().nonRegisteredFriends;
    this.myRegFriends = this.api.getUser().registeredFriends;
  }

  goToUpdateFriend(friend: Friend) {
    let navigationExtras: NavigationExtras = {
      state: {
        friend: friend,
      },
    };
    this.router.navigate(["update-friend"], navigationExtras);
  }

  goToSeeUser(user: User) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: user,
      },
    };
    this.router.navigate(["update-friend"], navigationExtras);
  }
}
