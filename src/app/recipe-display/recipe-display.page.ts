import { Ingredient } from "./../search/search.page";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-recipe-display",
  templateUrl: "./recipe-display.page.html",
  styleUrls: ["./recipe-display.page.scss"]
})
export class RecipeDisplayPage implements OnInit {
  veloute: Recipe = {
    id: 1,
    name: "Velouté de poireaux",
    ings: [
      { id: 1, name: "Tomate" },
      { id: 2, name: "Oignon" },
      { id: 3, name: "Ananas" }
    ],
    difficulty: 2,
    diet: "végétarien",
    duration: 20,
    image: "assets/img/veloute.jpg",
    numberOfPeople: 2,
    stages: ["étape 1", "étape 2"]
  };

  stars_name: Array<string> = [
    "star",
    "star-outline",
    "star-outline",
    "star-outline",
    "star-outline"
  ];

  constructor() {}

  ngOnInit() {

  for (const num of [0, 1, 2, 3, 4]) {
      if (this.veloute.difficulty > num) {
        this.stars_name[num] = "star";
      } else {
        this.stars_name[num] = "star-outline";
      }
    }
  }



}

class Recipe {
  public id: number;
  public name: string;
  public ings: Ingredient[];
  public difficulty: number;
  public diet: string;
  public duration: number;
  public image: string;
  public numberOfPeople: number;
  public stages: string[];
}
