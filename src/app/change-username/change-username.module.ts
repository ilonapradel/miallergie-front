import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeUsernamePageRoutingModule } from './change-username-routing.module';

import { ChangeUsernamePage } from './change-username.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeUsernamePageRoutingModule
  ],
  declarations: [ChangeUsernamePage]
})
export class ChangeUsernamePageModule {}
