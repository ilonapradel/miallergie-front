import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRecipePage } from './add-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: AddRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRecipePageRoutingModule {}
