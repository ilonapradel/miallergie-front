import { Component, OnInit, Input } from "@angular/core";
import { Preferences } from "../utilities-class";

@Component({
  selector: "app-diet-selector",
  templateUrl: "./diet-selector.component.html",
  styleUrls: ["./diet-selector.component.scss"]
})
export class DietSelectorComponent implements OnInit {
  regimesAlimentaire: string[];

  @Input("preferences")
  userPreferences: Preferences;

  constructor() {
    this.regimesAlimentaire = ["Végétarien", "Vegan", "Omnivore"];
  }

  ngOnInit() {}
}
