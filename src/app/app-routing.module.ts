import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccountComponent } from "./account/account.component";
import { ExploreComponent } from "./explore/explore.component";
import { MainComponent } from "./main/main.component";
import { PublishComponent } from "./publish/publish.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { canActivate } from "./auth-guard.service";
import { LogoutComponent } from "./logout/logout.component";

const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'publish', component: PublishComponent, canActivate: [canActivate] },
    { path: 'explore', component: ExploreComponent},
    { path: 'account', component: AccountComponent, canActivate: [canActivate]},
    { path: 'signout', component: LogoutComponent, canActivate: [canActivate]}
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}