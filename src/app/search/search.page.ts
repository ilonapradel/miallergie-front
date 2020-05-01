import { RecipeService } from "src/app/services/recipe.service";
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

  constructor(
    private foodService: FoodService,
    private recipeService: RecipeService
  ) {}

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
    let request = new SearchRequest();
    let where = request.where;
    let include = request.include;

    if (this.searchText != "") {
      where.name = {
        like: ".*" + this.searchText + ".*",
      };
    }
    if (this.types && this.types.length > 0) {
      let tab: SearchRequestWhereOr[] = [];
      for (const type of this.types) {
        tab.push({ type: type });
      }
      where.or = tab;
    }

    if (this.selectedFoods && this.selectedFoods.length > 0) {
      let relationRequest = new SearchRequestInclude();
      relationRequest.relation = "ingredients";

      let tab: SearchRequestWhereOr[] = [];
      for (const selectedFood of this.selectedFoods) {
        let newR: SearchRequestWhereOr = {
          foodId: selectedFood.id,
        };
        tab.push(newR);
      }
      relationRequest.scope.where.and = tab;
      include.push(relationRequest);
    }

    if (this.diets && this.diets.length > 0) {
      let relationRequest = new SearchRequestInclude();
      relationRequest.relation = "diets";

      let tab: SearchRequestWhereOr[] = [];
      for (const diet of this.diets) {
        let newR: SearchRequestWhereOr = {
          dietId: diet.id,
        };
        tab.push(newR);
      }
      relationRequest.scope.where.or = tab;
      include.push(relationRequest);
    }

    where.duration = {
      between: [this.rangeValue.lower, this.rangeValue.upper],
    };

    where.difficulty = {
      lte: this.difficulty,
    };
    console.log(request);
    console.log("filter=" + JSON.stringify(request));
    this.recipeService
      .getRecipes("filter=" + JSON.stringify(request))
      .then((recipes) => console.log(recipes))
      .catch((err) => console.error(err));
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
  where: SearchRequestWhere = new SearchRequestWhere();
  include: SearchRequestInclude[] = [];
}
class SearchRequestWhere {
  name?: SearchRequestWhereLike;
  duration?: SearchRequestWhereBetwen;
  difficulty: SearchRequestWhereLowerThan;
  or?: SearchRequestWhereOr[];
  and?: SearchRequestWhereAnd[];
}

class SearchRequestIncludeScope {
  where: SearchRequestWhere = new SearchRequestWhere();
}
class SearchRequestInclude {
  relation: string;
  scope: SearchRequestIncludeScope = new SearchRequestIncludeScope();
}
class SearchRequestWhereLike {
  like: string;
}
class SearchRequestWhereOr {
  type?: string;
  foodId?: string;
  dietId?: string;
}
class SearchRequestWhereAnd {
  type?: string;
  foodId?: string;
  dietId?: string;
}
class SearchRequestWhereBetwen {
  between: [number, number];
}
class SearchRequestWhereLowerThan {
  lte: number;
}
