import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRecipesPageRoutingModule } from './user-recipes-routing.module';

import { UserRecipesPage } from './user-recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRecipesPageRoutingModule
  ],
  declarations: [UserRecipesPage]
})
export class UserRecipesPageModule {}
