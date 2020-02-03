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

  constructor() {
    this.ings = [
      { id: 1, name: "Tomate" },
      { id: 2, name: "Oignon" },
      { id: 3, name: "Ananas" }
    ];
  }

  ngOnInit() {}

  onIngredientChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.selectedIngs = event.value;
  }
}
