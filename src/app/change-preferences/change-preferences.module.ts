import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChangePreferencesPageRoutingModule } from "./change-preferences-routing.module";

import { ChangePreferencesPage } from "./change-preferences.page";
import { IonicSelectableModule } from "ionic-selectable";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePreferencesPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [ChangePreferencesPage]
})
export class ChangePreferencesPageModule {}
