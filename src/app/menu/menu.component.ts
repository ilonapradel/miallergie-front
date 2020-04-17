import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Routes } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  constructor(public navCtrl: NavController) {}

  ngOnInit() {}
}
