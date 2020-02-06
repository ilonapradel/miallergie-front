import { UsersService } from "./../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Friend, User } from "../utilities-class";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-friend",
  templateUrl: "./friend.page.html",
  styleUrls: ["./friend.page.scss"]
})
export class FriendPage implements OnInit {
  myNonRegFriends: Friend[];
  myRegFriends: User[];

  constructor(private api: UsersService, private router: Router) {
    api.init();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.myNonRegFriends = this.api.getUser().nonRegisteredFriends;
    this.myRegFriends = this.api.getUser().registeredFriends;

    console.log(this.myNonRegFriends);
    console.log(this.myRegFriends);
  }

  goToUpdateFriend(friend: Friend) {
    let navigationExtras: NavigationExtras = {
      state: {
        friend: friend
      }
    };
    console.log(navigationExtras);
    this.router.navigate(["update-friend"], navigationExtras);
  }

  goToSeeUser(user: User) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: user
      }
    };
    console.log(navigationExtras);
    this.router.navigate(["update-friend"], navigationExtras);
  }
}
