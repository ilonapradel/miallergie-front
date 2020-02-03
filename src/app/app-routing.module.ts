import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/authentication", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "authentication",
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        m => m.AuthenticationPageModule
      )
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then(m => m.ProfilePageModule)
  },
  {
    path: "search",
    loadChildren: () =>
      import("./search/search.module").then(m => m.SearchPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recipe-display',
    loadChildren: () => import('./recipe-display/recipe-display.module').then( m => m.RecipeDisplayPageModule)
  },
  {
    path: 'change-username',
    loadChildren: () => import('./change-username/change-username.module').then( m => m.ChangeUsernamePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'change-email',
    loadChildren: () => import('./change-email/change-email.module').then( m => m.ChangeEmailPageModule)
  },
  {
    path: 'change-preferences',
    loadChildren: () => import('./change-preferences/change-preferences.module').then( m => m.ChangePreferencesPageModule)
  },
  {
    path: 'add-recipe',
    loadChildren: () => import('./add-recipe/add-recipe.module').then( m => m.AddRecipePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
