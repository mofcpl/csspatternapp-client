import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccountComponent } from "./account/account.component";
import { ExploreComponent } from "./explore/explore.component";
import { MainComponent } from "./main/main.component";
import { PublishComponent } from "./publish/publish.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { canActivate } from "./auth-guard.service";

const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'publish', component: PublishComponent },
    { path: 'explore', component: ExploreComponent, canActivate: [canActivate]},
    { path: 'account', component: AccountComponent}
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}