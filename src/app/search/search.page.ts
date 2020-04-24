import { FoodService } from "./../services/food.service";
import { Food } from "./../utilities-class";
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Ingredient, Diet } from "../utilities-class";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  diff_name: Array<string> = [
    "warning",
    "warning",
    "warning",
    "light",
    "light",
  ];

  @ViewChild("ingredientComponent", { static: false })
  ingredientComponent: IonicSelectableComponent;

  @ViewChild("dietComponent", { static: false })
  dietComponent: IonicSelectableComponent;

  rangeValue: { lower: number; upper: number } = { lower: 20, upper: 100 };

  searchText: string = "";
  types: string[] = [];
  diets: Diet[] = [];
  difficulty: number = 3;

  foodOptions: Food[] = [];
  selectedFoods: Food[] = [];

  constructor(private foodService: FoodService) {}

  // TODO : Use async search for ingredientComponent https://stackblitz.com/edit/ionic-selectable-on-search?file=pages%2Fhome%2Fhome.ts

  ngOnInit() {
    this.foodService
      .getFoods()
      .then((foods) => (this.foodOptions = foods))
      .catch((err) => console.error(err));
  }

  changeValue(value: { lower: number; upper: number }) {
    this.rangeValue = value;
  }

  onIngredientChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.selectedFoods = event.value;
  }

  deleteIngredient(food: Food) {
    this.selectedFoods.splice(this.selectedFoods.indexOf(food), 1);
    this.ingredientComponent.confirm();
  }

  clickOnSearch() {
    let where: SearchRequestWhere = new SearchRequestWhere();
    if (this.searchText != "") {
      where.name = {
        like: "%" + this.searchText + "%",
      };
    }
    if (this.types && this.types.length > 0) {
      let tab = [];
      for (const type of this.types) {
        tab.push({ type: type });
      }
      where.or = tab;
    }
    where.duration = {
      between: [this.rangeValue.lower, this.rangeValue.upper],
    };

    where.difficulty = {
      lte: this.difficulty,
    };
    let request: SearchRequest = {
      where: where,
    };
    console.log(request);
  }

  onChangeDiets(diets: Diet[]) {
    this.diets = diets;
  }

  clickOnDifficulty(position: number) {
    for (const num of [0, 1, 2, 3, 4]) {
      if (position >= num) {
        this.diff_name[num] = "warning";
      } else {
        this.diff_name[num] = "light";
      }
    }
    this.difficulty = position;
  }
}

class SearchRequest {
  where: SearchRequestWhere;
}
class SearchRequestWhere {
  name?: SearchRequestWhereLike;
  duration?: SearchRequestWhereBetwen;
  or?: SearchRequestWhereOr[];
  difficulty: SearchRequestWhereLowerThan;
}
class SearchRequestWhereLike {
  like: string;
}
class SearchRequestWhereOr {
  type?: string;
}
class SearchRequestWhereBetwen {
  between: [number, number];
}
class SearchRequestWhereLowerThan {
  lte: number;
}
