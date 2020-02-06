import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateFriendPage } from './update-friend.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateFriendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateFriendPageRoutingModule {}
