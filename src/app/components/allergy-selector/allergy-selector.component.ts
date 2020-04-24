import { AllergyService } from "./../../services/allergy.service";
import { Preferences, Allergy } from "../../utilities-class";
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

  @Output() result = new EventEmitter<Allergy[]>();

  @ViewChild("allergyComponent", { static: false })
  allergyComponent: IonicSelectableComponent;

  possibleAllergies: Allergy[];

  constructor(private allergyService: AllergyService) {
    this.possibleAllergies = this.allergyService.returnAllergies();
  }

  ngOnInit() {}

  onAllergyChange(event: { component: IonicSelectableComponent; value: any }) {
    this.userPreferences.allergies = event.value;
    this.result.emit(this.userPreferences.allergies);
  }

  deleteAllergy(allergie: Allergy) {
    this.userPreferences.allergies.splice(
      this.userPreferences.allergies.indexOf(allergie),
      1
    );
    this.allergyComponent.confirm();
  }
}
