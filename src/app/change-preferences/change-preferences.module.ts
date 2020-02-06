import { ComponentsModule } from "./../components/components.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChangePreferencesPageRoutingModule } from "./change-preferences-routing.module";

import { ChangePreferencesPage } from "./change-preferences.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePreferencesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ChangePreferencesPage]
})
export class ChangePreferencesPageModule {}
