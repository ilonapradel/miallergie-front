import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeDisplayPageRoutingModule } from './recipe-display-routing.module';

import { RecipeDisplayPage } from './recipe-display.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeDisplayPageRoutingModule
  ],
  declarations: [RecipeDisplayPage]
})
export class RecipeDisplayPageModule {}
