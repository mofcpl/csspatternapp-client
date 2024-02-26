import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { LinksComponent } from './links/links.component';
import { FooterComponent } from './footer/footer.component';
//import { CodeComponent } from './code/code.component';
import { MainPropComponent } from './main-prop/main-prop.component';
// import { ManagementComponent } from './management/management.component';
// import { PreviewComponent } from './preview/preview.component';
// import { PropertiesComponent } from './properties/properties.component';
// import { ListComponent } from './list/list.component';
import { ButtonsComponent } from './main-prop/buttons/buttons.component';
import { ControlsComponent } from './main-prop/controls/controls.component';
// import { LinearComponent } from './properties/linear/linear.component';
// import { RadialComponent } from './properties/radial/radial.component';
// import { LineComponent } from './properties/line/line.component';
// import { RadiusComponent } from './properties/radius/radius.component';
import { StoreModule } from '@ngrx/store';
import { patternReducer } from './core/store/pattern/pattern.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { SignInComponent } from './sign-in/sign-in.component';
//import { PublishComponent } from './publish/publish.component';
// import { ExploreComponent } from './explore/explore.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
// import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth-guard.service';
import { authReducer } from './core/store/auth/auth.reducer';
import { AuthEffects } from './core/store/auth/auth.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { LogoutComponent } from './logout/logout.component';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './core/store/app/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    LinksComponent,
    FooterComponent,
    //CodeComponent,
    MainPropComponent,
    // ManagementComponent,
    // PreviewComponent,
    // PropertiesComponent,
    // ListComponent,
    ButtonsComponent,
    ControlsComponent,
    // LinearComponent,
    // RadialComponent,
    // LineComponent,
    // RadiusComponent,
    // SignUpComponent,
    // SignInComponent,
    //PublishComponent,
    // ExploreComponent,
    MainComponent,
    // AccountComponent,
    // LogoutComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      pattern: patternReducer,
      auth: authReducer,
      app: appReducer
    }),
    //EffectsModule.forRoot([PatternEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

  ],
  providers: [
    AuthGuard, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
