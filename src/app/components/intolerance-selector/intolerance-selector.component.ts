import { IntoleranceService } from "./../../services/intolerance.service";
import { Intolerance } from "./../../utilities-class";
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
  possibleIntolerances: Intolerance[];

  @Input("preferences")
  userPreferences: Preferences;

  @Input("enabled")
  enabled: boolean;

  @ViewChild("intoleranceComponent", { static: false })
  intoleranceComponent: IonicSelectableComponent;

  @Output() result = new EventEmitter<Intolerance[]>();

  constructor(private intolService: IntoleranceService) {
    this.possibleIntolerances = intolService.returnIntolerances();
  }

  ngOnInit() {}

  onIntoleranceChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.userPreferences.intolerances = event.value;
    this.result.emit(this.userPreferences.intolerances);
  }

  deleteIntolerance(intolerance: Intolerance) {
    this.userPreferences.intolerances.splice(
      this.userPreferences.intolerances.indexOf(intolerance),
      1
    );
    this.intoleranceComponent.confirm();
  }
}
