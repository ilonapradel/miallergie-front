import { Recipe, Food, Ingredient } from "./../utilities-class";
import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ViewChild
} from "@angular/core";
import { RecipeService } from "../services/recipe.service";
import { FoodService } from "../services/food.service";
import {
  Camera,
  PictureSourceType,
  CameraOptions
} from "@ionic-native/camera/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import {
  ActionSheetController,
  Platform,
  LoadingController
} from "@ionic/angular";
import { FilePath } from "@ionic-native/file-path/ngx";
import { IonicSelectableComponent } from "ionic-selectable";
import { File } from "@ionic-native/file/ngx";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-edit-recipe",
  templateUrl: "./edit-recipe.page.html",
  styleUrls: ["./edit-recipe.page.scss"]
})
export class EditRecipePage implements OnInit {
  private recipe: Recipe;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.recipe) {
          this.recipe = this.router.getCurrentNavigation().extras.state.recipe;
        }
      }
    });
    console.log(this.recipe);
  }
}
