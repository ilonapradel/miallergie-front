import { Component, OnInit } from "@angular/core";
import { Recipe } from "../utilities-class";

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

  difficulty_color: Array<string> = [
    "warning",
    "light",
    "light",
    "light",
    "light"
  ];

  constructor() {}

  ngOnInit() {
    for (const num of [0, 1, 2, 3, 4]) {
      if (this.veloute.difficulty > num) {
        this.difficulty_color[num] = "warning";
      } else {
        this.difficulty_color[num] = "light";
      }
    }
  }
}
