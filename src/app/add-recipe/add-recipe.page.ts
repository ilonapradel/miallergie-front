import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Ingredient } from "../utilities-class";

@Component({
  selector: "app-add-recipe",
  templateUrl: "./add-recipe.page.html",
  styleUrls: ["./add-recipe.page.scss"]
})
export class AddRecipePage implements OnInit {
  @ViewChild("ingredientComponent", { static: false })
  ingredientComponent: IonicSelectableComponent;

  ings: Ingredient[];
  selectedIngs: Ingredient[] = [];

  regimesAlimentaire: string[];
  unites: string[];

  nbSteps: number = 5;

  diff_name: Array<string> = ["warning", "light", "light", "light", "light"];

  constructor() {
    this.ings = [
      { id: 1, name: "Tomate" },
      { id: 2, name: "Oignon" },
      { id: 3, name: "Ananas" }
    ];

    this.regimesAlimentaire = ["Végétarien", "Vegan", "Omnivore"];
    this.unites = ["Cuillère à soupe", "g", "cL", "pincées"];
  }

  ngOnInit() {}

  onIngredientChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.selectedIngs = event.value;
  }

  clickOnStar(position: number) {
    for (const num of [0, 1, 2, 3, 4]) {
      if (position >= num) {
        this.diff_name[num] = "warning";
      } else {
        this.diff_name[num] = "light";
      }
    }
  }
}
