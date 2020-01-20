import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
