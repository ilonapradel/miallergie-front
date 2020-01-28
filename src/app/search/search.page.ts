import { Component, OnInit } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { timingSafeEqual } from "crypto";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"]
})
export class SearchPage implements OnInit {
  star = "star";
  star_out = "star-outline";
  stars_name: Array<string> = [
    "star",
    "star-outline",
    "star-outline",
    "star-outline",
    "star-outline"
  ];
  rangeValue: { lower: number; upper: number } = { lower: 20, upper: 100 };

  ings: Ingredient[];
  selectedIngs: Ingredient[] = [];

  selectableComponent: IonicSelectableComponent;

  constructor() {
    this.ings = [
      { id: 1, name: "Tomate" },
      { id: 2, name: "Oignon" },
      { id: 3, name: "Ananas" }
    ];

    this.selectedIngs.push(this.ings[0]);
  }

  ngOnInit() {}

  clickOnStar(position: number) {
    for (const num of [0, 1, 2, 3, 4]) {
      if (position > num) {
        this.stars_name[num] = "star";
      } else {
        this.stars_name[num] = "star-outline";
      }
    }
  }

  changeValue(value: { lower: number; upper: number }) {
    this.rangeValue = value;
  }

  onIngredientChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.selectableComponent = event.component;
    this.selectedIngs = event.value;
  }

  deleteIngredient(ingredient: Ingredient) {
    this.selectedIngs.splice(this.selectedIngs.indexOf(ingredient), 1);
    this.onIngredientChange({
      component: this.selectableComponent,
      value: this.selectedIngs
    });
    console.log(this.selectedIngs);
  }
}

class Ingredient {
  public id: number;
  public name: string;
}
