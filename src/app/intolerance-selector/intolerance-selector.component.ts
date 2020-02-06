import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Preferences } from "../utilities-class";

@Component({
  selector: "app-intolerance-selector",
  templateUrl: "./intolerance-selector.component.html",
  styleUrls: ["./intolerance-selector.component.scss"]
})
export class IntoleranceSelectorComponent implements OnInit {
  possibleIntolerances: string[];

  @Input("preferences")
  userPreferences: Preferences;

  @ViewChild("intoleranceComponent", { static: false })
  intoleranceComponent: IonicSelectableComponent;

  constructor() {
    this.possibleIntolerances = ["glucose", "gluten", "lactose", "fructose"];
  }

  ngOnInit() {}

  onIntoleranceChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.userPreferences.intolerance = event.value;
  }

  deleteIntolerance(intolerance: string) {
    this.userPreferences.intolerance.splice(
      this.userPreferences.intolerance.indexOf(intolerance),
      1
    );
    console.log(this.userPreferences.intolerance);
    this.intoleranceComponent.confirm();
  }
}
