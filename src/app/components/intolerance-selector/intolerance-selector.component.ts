import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Preferences, Ingredient } from "../../utilities-class";

@Component({
  selector: "app-intolerance-selector",
  templateUrl: "./intolerance-selector.component.html",
  styleUrls: ["./intolerance-selector.component.scss"],
})
export class IntoleranceSelectorComponent implements OnInit {
  possibleIntolerances: Ingredient[];

  @Input("preferences")
  userPreferences: Preferences;

  @Input("enabled")
  enabled: boolean;

  @ViewChild("intoleranceComponent", { static: false })
  intoleranceComponent: IonicSelectableComponent;

  @Output() result = new EventEmitter<Ingredient[]>();

  constructor() {
    this.possibleIntolerances = [];
  }

  ngOnInit() {}

  onIntoleranceChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.userPreferences.intolerance = event.value;
    this.result.emit(this.userPreferences.intolerance);
  }

  deleteIntolerance(intolerance: Ingredient) {
    this.userPreferences.intolerance.splice(
      this.userPreferences.intolerance.indexOf(intolerance),
      1
    );
    console.log(this.userPreferences.intolerance);
    this.intoleranceComponent.confirm();
  }
}
