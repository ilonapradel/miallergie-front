import { Component, OnInit } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";

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

  ports: Port[];
  port: Port;

  constructor() {
    this.ports = [
      { id: 1, name: "Tokai" },
      { id: 2, name: "Vladivostok" },
      { id: 3, name: "Navlakhi" }
    ];
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

  portChange(event: { component: IonicSelectableComponent; value: any }) {
    console.log("port:", event.value);
  }

  addIngredient() {}
}

class Port {
  public id: number;
  public name: string;
}
