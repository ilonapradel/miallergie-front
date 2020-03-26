import { Component, OnInit, Input } from "@angular/core";
import { Preferences, Diet } from "../utilities-class";
import { DietService } from "../services/diet.service";

@Component({
  selector: "app-diet-selector",
  templateUrl: "./diet-selector.component.html",
  styleUrls: ["./diet-selector.component.scss"]
})
export class DietSelectorComponent implements OnInit {
  dietOptions: Diet[] = [];

  @Input("diets")
  diets: Diet[];

  @Input("disabled")
  disabled: boolean;

  @Input("multiple")
  multiple: boolean;

  constructor(private dietService: DietService) {
    this.dietService
      .getDiets()
      .then((d: Diet[]) => {
        this.dietOptions = d;
      })
      .catch(err => console.log(err));
    console.log(this.dietOptions);
  }

  ngOnInit() {
    console.log(this.diets);
  }

  onSelectChange(event: any) {
    console.log("Selected", event);
    this.diets = event.detail.value;
  }
}
