import { Component, OnInit } from "@angular/core";

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

  constructor() {}

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

  addIngredient() {}
}
