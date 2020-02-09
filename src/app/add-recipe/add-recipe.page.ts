import { WebView } from "@ionic-native/ionic-webview/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { File } from "@ionic-native/file/ngx";
import {
  Platform,
  LoadingController,
  ActionSheetController
} from "@ionic/angular";
import { FoodService } from "./../services/food.service";
import { DietService } from "./../services/diet.service";
import { Recipe, Diet, Food } from "./../utilities-class";
import { RecipeService } from "./../services/recipe.service";
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";
import { Ingredient } from "../utilities-class";
import {
  PictureSourceType,
  CameraOptions,
  Camera
} from "@ionic-native/camera/ngx";

@Component({
  selector: "app-add-recipe",
  templateUrl: "./add-recipe.page.html",
  styleUrls: ["./add-recipe.page.scss"]
})
export class AddRecipePage implements OnInit {
  //const
  unites: string[] = ["Cuillère à soupe", "g", "cL", "pincées"];
  recipe: Recipe = new Recipe();
  dietOptions: Diet[] = [];
  foodOptions: Food[] = [];
  selectedFoodOptions: Food[] = [];
  typeOptions: string[] = ["Entrée", "Plat", "Dessert"];
  correctPath: string;
  currentName: string;

  @ViewChild("ingredientComponent", { static: false })
  ingredientComponent: IonicSelectableComponent;

  diff_name: Array<string> = [
    "warning",
    "warning",
    "warning",
    "light",
    "light"
  ];

  constructor(
    private recipeService: RecipeService,
    private dietService: DietService,
    private foodService: FoodService,
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,
    private filePath: FilePath
  ) {
    this.dietService
      .getDiets()
      .then((diets: Diet[]) => {
        this.dietOptions = diets;
      })
      .catch(err => console.log(err));

    this.foodService
      .getFoods()
      .then(foods => (this.foodOptions = foods))
      .catch(err => console.error(err));
  }

  ngOnInit() {}

  onIngredientChange(event: {
    component: IonicSelectableComponent;
    value: Food[];
  }) {
    for (const food of event.value) {
      let ingredient = new Ingredient();
      ingredient.food = food;
      this.recipe.ingredients.push(ingredient);
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  clickOnDifficulty(position: number) {
    for (const num of [0, 1, 2, 3, 4]) {
      if (position >= num) {
        this.diff_name[num] = "warning";
      } else {
        this.diff_name[num] = "light";
      }
    }
    this.recipe.difficulty = position;
  }

  clickOnAdd(recipe: Recipe) {
    console.log({ recipe });
    this.recipeService
      .addRecipe(recipe)
      .then((savedRecipe: Recipe) => {
        let savedIngredients: Promise<Ingredient>[] = [];
        for (const ingredient of this.recipe.ingredients) {
          savedIngredients.push(
            this.recipeService.addIngredientToRecipe(savedRecipe, ingredient)
          );
        }

        console.log("Sauvagarde de ", this.currentName, this.correctPath);

        if (this.correctPath && this.currentName) {
          //save image if needed
          this.file
            .readAsArrayBuffer(this.correctPath, this.currentName)
            .then((buffer: ArrayBuffer) => {
              let data = new Blob([buffer], { type: "image/jpeg" });
              this.recipeService
                .addImageToRecipe(savedRecipe, data, this.currentName)
                .then(res => console.log(res))
                .catch(err => console.error(err));
            });
        }

        Promise.all(savedIngredients).catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
      });
  }

  onChangeNbStages(event: { detail: { value: number } }) {
    console.log(event);
    if (event && event.detail && event.detail.value) {
      let nb = event.detail.value;
      if (nb > this.recipe.stages.length) {
        for (let i = this.recipe.stages.length; i < nb; i++) {
          this.recipe.stages.push("");
        }
      } else {
        this.recipe.stages = this.recipe.stages.slice(0, event.detail.value);
      }
    }
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (
        this.plt.is("android") &&
        sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
      ) {
        this.filePath.resolveNativePath(imagePath).then(filePath => {
          this.correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
          this.currentName = imagePath.substring(
            imagePath.lastIndexOf("/") + 1,
            imagePath.lastIndexOf("?")
          );
          /* this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          ); */
        });
      } else {
        this.currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
        this.correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
        /* this.copyFileToLocalDir(
          correctPath,
          currentName,
          this.createFileName()
        ); */
      }
    });
  }
}
