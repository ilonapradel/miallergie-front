import { Component, OnInit, ViewChild, Input } from "@angular/core";
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
import { IngredientService } from "src/app/services/ingredient.service";
import { DietService } from "src/app/services/diet.service";

@Component({
  selector: "app-set-recipe",
  templateUrl: "./set-recipe.component.html",
  styleUrls: ["./set-recipe.component.scss"]
})
export class SetRecipeComponent implements OnInit {
  @Input()
  recipe: Recipe;

  @Input()
  toEdit: boolean;

  //const
  unites: string[] = ["Cuillère à soupe", "g", "cL", "pincées"]; // TODO gérer avec le WS
  foodOptions: Food[] = [];
  selectedFoodOptions: Food[] = [];
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
    private router: Router,
    private ingredientService: IngredientService,
    private dietService: DietService
  ) {
    this.utilities = new UtilitiesClass(new ToastController(), router);

    this.foodService
      .getFoods()
      .then(foods => (this.foodOptions = foods))
      .catch(err => console.error(err));
  }

  ngOnInit() {
    console.log(this.recipe);
    this.recipe.diets = [];

    if (this.toEdit) {
      this.getIngredientFromRecipe();
      this.getDietFromRecipe();
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

  clickOnAdd() {
    console.log({ global: this.recipe });
    this.recipeService
      .addRecipe(this.recipe)
      .then((savedRecipe: Recipe) => {
        const saveProm: Promise<any>[] = [];

        console.log("Sauvegarde de ", this.currentName, this.correctPath);

        this.saveIngredients(saveProm, savedRecipe);
        this.saveDiets(saveProm, savedRecipe);
        this.saveImage(saveProm, savedRecipe);

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
            this.catchSavingError(err, " des ingrédients");
          });
      })
      .catch(err => {
        this.catchSavingError(err, " de la recette");
      });
  }

  catchSavingError(err: any, message: string) {
    console.error(err);
    let errMsg = "Erreur lors de la sauvegarde" + message;
    try {
      errMsg = err.message;
    } catch {}
    try {
      errMsg = err.error.error.message;
    } catch {}

    this.utilities.showToastSimple(errMsg, 2000, "danger");
  }

  saveDiets(saveProm: Promise<any>[], savedRecipe: Recipe) {
    //save diets
    for (const diet of this.recipe.diets) {
      const prom = this.recipeService.addDietToRecipe(savedRecipe, diet);
      saveProm.push(prom);
    }
  }

  saveIngredients(saveProm: Promise<any>[], savedRecipe: Recipe) {
    for (const ingredient of this.recipe.ingredients) {
      saveProm.push(
        this.recipeService.addIngredientToRecipe(savedRecipe, ingredient)
      );
    }
  }

  saveImage(saveProm: Promise<any>[], savedRecipe: Recipe) {
    if (this.correctPath && this.currentName) {
      //save image if needed
      this.file
        .readAsArrayBuffer(this.correctPath, this.currentName)
        .then((buffer: ArrayBuffer) => {
          const data = new Blob([buffer], { type: "image/jpeg" });
          saveProm.push(
            this.recipeService.addImageToRecipe(
              savedRecipe,
              data,
              this.currentName
            )
          );
        })
        .catch(err => {
          this.catchSavingError(err, " de l'image");
        });
    }
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

  async getIngredientFromRecipe() {
    //getting ingrediants with their food
    try {
      const ingredients = await this.recipeService.getIngredientFromRecipe(
        this.recipe
      );
      this.recipe.ingredients = [];
      console.log(ingredients);
      for (const ingredient of ingredients) {
        let newFood = new Food();
        try {
          newFood = await this.ingredientService.getFoodOfIngredient(
            ingredient
          );
        } catch (error) {
          console.error(error);
        }
        ingredient.food = newFood;
        this.recipe.ingredients.push(ingredient);
        this.selectedFoodOptions.push(newFood);
        this.previouslySelectedFoodOptions.push(newFood);
      }
      console.log("asyn", this.selectedFoodOptions);
    } catch (error) {
      console.error(error);
    }
  }

  async getDietFromRecipe() {
    //getting diet
    this.recipeService
      .getDietsFromRecipe(this.recipe)
      .then(async linkDiets => {
        this.recipe.diets = [];
        for (const linkDiet of linkDiets) {
          const diet = await this.dietService.getDiet(linkDiet.dietId);
          this.recipe.diets.push(diet);
        }
      })
      .catch(err => console.error(err));
  }

  clickOnUpdate() {
    console.log({ global: this.recipe });
    this.recipeService
      .updateRecipe(this.recipe)
      .then((savedRecipe: Recipe) => {
        const saveProm: Promise<any>[] = [];

        console.log("Modification de ", this.currentName, this.correctPath);
        this.utilities.showToastSimple("Recette modifiée !", 1000, "success");
        this.router.navigate(["/home"]);
      })
      .catch(err => {
        this.catchSavingError(err, " de la recette");
      });
  }
}
