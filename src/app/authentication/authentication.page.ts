import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.page.html",
  styleUrls: ["./authentication.page.scss"]
})
export class AuthenticationPage implements OnInit {
  constructor() {}
  username: Text;
  password: Text;

  ngOnInit() {}

  processForm() {}
}
