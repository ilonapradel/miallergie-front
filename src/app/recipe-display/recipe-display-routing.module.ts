import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeDisplayPage } from './recipe-display.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeDisplayPageRoutingModule {}
