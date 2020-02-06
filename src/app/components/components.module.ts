import { DietSelectorComponent } from "./../diet-selector/diet-selector.component";
import { IntoleranceSelectorComponent } from "./../intolerance-selector/intolerance-selector.component";
import { IonicSelectableModule } from "ionic-selectable";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllergySelectorComponent } from "./allergy-selector/allergy-selector.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [
    AllergySelectorComponent,
    IntoleranceSelectorComponent,
    DietSelectorComponent
  ],
  imports: [CommonModule, IonicModule, IonicSelectableModule],
  exports: [
    AllergySelectorComponent,
    IntoleranceSelectorComponent,
    DietSelectorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
