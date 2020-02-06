import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateFriendPageRoutingModule } from './update-friend-routing.module';

import { UpdateFriendPage } from './update-friend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateFriendPageRoutingModule
  ],
  declarations: [UpdateFriendPage]
})
export class UpdateFriendPageModule {}
