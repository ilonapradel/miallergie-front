import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeUsernamePage } from './change-username.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeUsernamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeUsernamePageRoutingModule {}
