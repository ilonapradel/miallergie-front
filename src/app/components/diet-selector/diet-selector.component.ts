import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Diet } from "src/app/utilities-class";
import { IonicSelectableComponent } from "ionic-selectable";
import { DietService } from "src/app/services/diet.service";

@Component({
  selector: "app-diet-selector",
  templateUrl: "./diet-selector.component.html",
  styleUrls: ["./diet-selector.component.scss"]
})
export class DietSelectorComponent implements OnInit {
  dietOptions: Diet[] = [];

  @Input("diets")
  diets: Diet[];

  @Input("enabled")
  enabled: boolean;

  @ViewChild("dietComponent", { static: false })
  dietComponent: IonicSelectableComponent;

  constructor(private dietService: DietService) {
    this.dietService
      .getDiets()
      .then((d: Diet[]) => {
        this.dietOptions = d;
      })
      .catch(err => console.log(err));
  }

  ngOnInit() {}

  onSelectChange(event: { component: IonicSelectableComponent; value: any }) {
    this.diets = event.value;
  }

  deleteDiet(diet: Diet) {
    this.diets.splice(this.diets.indexOf(diet), 1);
    this.dietComponent.confirm();
  }
}
