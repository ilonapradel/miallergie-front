import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRecipePage } from './edit-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: EditRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRecipePageRoutingModule {}
