import { Component, OnInit, ViewChild } from "@angular/core";
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

  @ViewChild("ingredientComponent", { static: false })
  ingredientComponent: IonicSelectableComponent;

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
  }

  // TODO : Use async search for ingredientComponent https://stackblitz.com/edit/ionic-selectable-on-search?file=pages%2Fhome%2Fhome.ts

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
    this.selectedIngs = event.value;
  }

  deleteIngredient(ingredient: Ingredient) {
    this.selectedIngs.splice(this.selectedIngs.indexOf(ingredient), 1);
    console.log(this.selectedIngs);
    this.ingredientComponent.confirm();
  }
}

class Ingredient {
  public id: number;
  public name: string;
}
