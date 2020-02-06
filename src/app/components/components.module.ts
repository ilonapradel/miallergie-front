import { IonicSelectableModule } from "ionic-selectable";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllergySelectorComponent } from "./allergy-selector/allergy-selector.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [AllergySelectorComponent],
  imports: [CommonModule, IonicModule, IonicSelectableModule],
  exports: [AllergySelectorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
