import { Component, OnInit, ViewChild } from "@angular/core";
import {
  Recipe,
  Food,
  UtilitiesClass,
  Ingredient,
  Diet
} from "src/app/utilities-class";
import { IonicSelectableComponent } from "ionic-selectable";
import { RecipeService } from "src/app/services/recipe.service";
import { FoodService } from "src/app/services/food.service";
import {
  Camera,
  PictureSourceType,
  CameraOptions
} from "@ionic-native/camera/ngx";
import {
  ActionSheetController,
  Platform,
  ToastController
} from "@ionic/angular";
import { FilePath } from "@ionic-native/file-path/ngx";
import { Router } from "@angular/router";
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: "app-set-recipe",
  templateUrl: "./set-recipe.component.html",
  styleUrls: ["./set-recipe.component.scss"]
})
export class SetRecipeComponent implements OnInit {
  //const
  unites: string[] = ["Cuillère à soupe", "g", "cL", "pincées"];
  recipe: Recipe = new Recipe();
  foodOptions: Food[] = [];
  selectedFoodOptions: Food[];
  previouslySelectedFoodOptions: Food[] = [];
  typeOptions: string[] = ["Entrée", "Plat", "Dessert"];
  correctPath: string;
  currentName: string;
  private utilities: UtilitiesClass;

  @ViewChild("ingredientComponent", { static: false })
  ingredientComponent: IonicSelectableComponent;

  @ViewChild("dietComponent", { static: false })
  dietComponent: IonicSelectableComponent;

  diff_name: Array<string> = [
    "warning",
    "warning",
    "warning",
    "light",
    "light"
  ];

  constructor(
    private recipeService: RecipeService,
    private foodService: FoodService,
    private camera: Camera,
    private file: File,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private filePath: FilePath,
    private router: Router
  ) {
    this.utilities = new UtilitiesClass(new ToastController(), router);

    this.foodService
      .getFoods()
      .then(foods => (this.foodOptions = foods))
      .catch(err => console.error(err));

    this.recipe.diets = [];
  }

  ngOnInit() {}

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

  clickOnAdd() {
    console.log({ global: this.recipe });
    this.recipeService
      .addRecipe(this.recipe)
      .then((savedRecipe: Recipe) => {
        const saveProm: Promise<any>[] = [];
        for (const ingredient of this.recipe.ingredients) {
          saveProm.push(
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
              saveProm.push(
                this.recipeService.addImageToRecipe(
                  savedRecipe,
                  data,
                  this.currentName
                )
              );
            })
            .catch(err => {
              let err_msg = "Error lors de la sauvegarde de l'image";
              try {
                err_msg = err.message;
              } catch {}
              try {
                err_msg = err.error.error.message;
              } catch {}

              this.utilities.showToastSimple(err_msg, 2000, "danger");
            });
        }

        //save diets
        for (const diet of this.recipe.diets) {
          let prom = this.recipeService.addDietToRecipe(savedRecipe, diet);
          saveProm.push(prom);
        }

        Promise.all(saveProm)
          .then(() => {
            this.utilities.showToastSimple(
              "Recette sauvegardée !",
              1000,
              "success"
            );
            this.router.navigate(["/home"]);
          })
          .catch(err => {
            console.error(err);
            let err_msg = "Error lors de la sauvegarde des ingrédiants";
            try {
              err_msg = err.message;
            } catch {}
            try {
              err_msg = err.error.error.message;
            } catch {}

            this.utilities.showToastSimple(err_msg, 2000, "danger");
          });
      })
      .catch(err => {
        console.error(err);
        let err_msg = "Error lors de la sauvegarde de la recette";
        try {
          err_msg = err.message;
        } catch {}
        try {
          err_msg = err.error.error.message;
        } catch {}

        this.utilities.showToastSimple(err_msg, 2000, "danger");
      });
  }

  onChangeNbStages(event: { detail: { value: number } }) {
    console.log(event);
    if (event && event.detail && event.detail.value) {
      const nb = event.detail.value;
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
        });
      } else {
        this.currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
        this.correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
      }
    });
  }

  onChangeDiets(diets: Diet[]) {
    this.recipe.diets = diets;
    console.log(this.recipe);
  }

  onIngredientChange(event: {
    component: IonicSelectableComponent;
    value: Food[];
  }) {
    console.log(this.selectedFoodOptions);

    for (const food of this.selectedFoodOptions) {
      if (this.previouslySelectedFoodOptions.indexOf(food) === -1) {
        const ingredient = new Ingredient();
        ingredient.food = food;
        this.recipe.ingredients.push(ingredient);
      }
    }

    this.previouslySelectedFoodOptions = this.selectedFoodOptions;
  }

  deleteIngredient(ingredient: Ingredient): void {
    this.recipe.ingredients.splice(
      this.recipe.ingredients.indexOf(ingredient),
      1
    );
    this.selectedFoodOptions.splice(
      this.selectedFoodOptions.indexOf(ingredient.food),
      1
    );
    this.ingredientComponent.confirm();
  }
}
