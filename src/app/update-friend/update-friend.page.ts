import { Preferences } from "./../utilities-class";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Friend, User } from "../utilities-class";

@Component({
  selector: "app-update-friend",
  templateUrl: "./update-friend.page.html",
  styleUrls: ["./update-friend.page.scss"]
})
export class UpdateFriendPage implements OnInit {
  public friend: Friend;
  public user: User;
  public amAFriend: boolean = false;
  public name: string;
  public userPref: Preferences;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.friend) {
          this.friend = this.router.getCurrentNavigation().extras.state.friend;
          this.amAFriend = true;
        }
        if (this.router.getCurrentNavigation().extras.state.user) {
          this.user = this.router.getCurrentNavigation().extras.state.user;
        }
        console.log(this.router.getCurrentNavigation().extras.state);
      }
    });

    if (this.amAFriend) {
      this.name = this.friend.surname;
      this.userPref = this.friend.preferences;
    } else {
      this.name = this.user.username;
      this.userPref = this.user.preferences;
    }
  }

  savePreferences() {
    console.log(this.userPref);
    this.router.navigate(["/friend"]);
  }
}
