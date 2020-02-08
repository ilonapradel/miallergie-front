import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRecipesPage } from './user-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: UserRecipesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRecipesPageRoutingModule {}
