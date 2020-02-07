import { ComponentsModule } from "./../components/components.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddFriendPageRoutingModule } from "./add-friend-routing.module";

import { AddFriendPage } from "./add-friend.page";
import { IonicSelectableModule } from "ionic-selectable";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFriendPageRoutingModule,
    IonicSelectableModule,
    ComponentsModule
  ],
  declarations: [AddFriendPage]
})
export class AddFriendPageModule {}
