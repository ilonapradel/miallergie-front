import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRecipePageRoutingModule } from './edit-recipe-routing.module';

import { EditRecipePage } from './edit-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRecipePageRoutingModule
  ],
  declarations: [EditRecipePage]
})
export class EditRecipePageModule {}
