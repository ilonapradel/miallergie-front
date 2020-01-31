import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePreferencesPage } from './change-preferences.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePreferencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePreferencesPageRoutingModule {}
