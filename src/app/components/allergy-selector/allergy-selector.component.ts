import { Preferences, Ingredient } from "../../utilities-class";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  NgModule,
  Output,
  EventEmitter,
} from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";

@Component({
  selector: "app-allergy-selector",
  templateUrl: "./allergy-selector.component.html",
  styleUrls: ["./allergy-selector.component.scss"],
})
export class AllergySelectorComponent implements OnInit {
  @Input("preferences")
  userPreferences: Preferences;

  @Input("enabled")
  enabled: boolean;

  @Output() result = new EventEmitter<Ingredient[]>();

  @ViewChild("allergyComponent", { static: false })
  allergyComponent: IonicSelectableComponent;

  possibleAllergies: Ingredient[];

  constructor() {
    this.possibleAllergies = [];
  }

  ngOnInit() {}

  onAllergyChange(event: { component: IonicSelectableComponent; value: any }) {
    this.userPreferences.allergy = event.value;
    this.result.emit(this.userPreferences.allergy);
  }

  deleteAllergy(ingredient: Ingredient) {
    this.userPreferences.allergy.splice(
      this.userPreferences.allergy.indexOf(ingredient),
      1
    );
    console.log(this.userPreferences.allergy);
    this.allergyComponent.confirm();
  }
}
