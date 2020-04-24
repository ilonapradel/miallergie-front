import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Ingredient } from "../utilities-class";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  difficulty_color: Array<string> = [
    "warning",
    "light",
    "light",
    "light",
    "light",
  ];

  @ViewChild("ingredientComponent", { static: false })
  ingredientComponent: IonicSelectableComponent;

  rangeValue: { lower: number; upper: number } = { lower: 20, upper: 100 };

  ings: Ingredient[];
  selectedIngs: Ingredient[] = [];

  constructor() {
    this.ings = [];
  }

  // TODO : Use async search for ingredientComponent https://stackblitz.com/edit/ionic-selectable-on-search?file=pages%2Fhome%2Fhome.ts

  ngOnInit() {}

  clickOnDiff(position: number) {
    for (const num of [0, 1, 2, 3, 4]) {
      if (position >= num) {
        this.difficulty_color[num] = "warning";
      } else {
        this.difficulty_color[num] = "light";
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

  clickOnSearch() {}
}
