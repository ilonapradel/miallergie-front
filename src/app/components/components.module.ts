import { FormsModule } from "@angular/forms";
import { SetRecipeComponent } from "./set-recipe/set-recipe.component";
import { DietSelectorComponent } from "./diet-selector/diet-selector.component";
import { IntoleranceSelectorComponent } from "./intolerance-selector/intolerance-selector.component";
import { IonicSelectableModule } from "ionic-selectable";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllergySelectorComponent } from "./allergy-selector/allergy-selector.component";
import { IonicModule } from "@ionic/angular";
import { RecipeCardComponent } from "./recipe-card/recipe-card.component";

@NgModule({
  declarations: [
    AllergySelectorComponent,
    IntoleranceSelectorComponent,
    DietSelectorComponent,
    RecipeCardComponent,
    SetRecipeComponent
  ],
  imports: [CommonModule, IonicModule, IonicSelectableModule, FormsModule],
  exports: [
    AllergySelectorComponent,
    IntoleranceSelectorComponent,
    DietSelectorComponent,
    RecipeCardComponent,
    SetRecipeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
