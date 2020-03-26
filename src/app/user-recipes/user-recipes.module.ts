import { ComponentsModule } from "./../components/components.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { UserRecipesPageRoutingModule } from "./user-recipes-routing.module";

import { UserRecipesPage } from "./user-recipes.page";
import { RecipeCardComponent } from "../components/recipe-card/recipe-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRecipesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UserRecipesPage]
})
export class UserRecipesPageModule {}
