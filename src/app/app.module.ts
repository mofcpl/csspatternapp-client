import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { LinksComponent } from './links/links.component';
import { FooterComponent } from './footer/footer.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CodeComponent } from './code/code.component';
import { MainPropComponent } from './main-prop/main-prop.component';
import { ManagementComponent } from './management/management.component';
import { PreviewComponent } from './preview/preview.component';
import { PropertiesComponent } from './properties/properties.component';
import { ListComponent } from './list/list.component';
import { ButtonsComponent } from './main-prop/buttons/buttons.component';
import { ControlsComponent } from './main-prop/controls/controls.component';
import { LinearComponent } from './properties/linear/linear.component';
import { RadialComponent } from './properties/radial/radial.component';
import { LineComponent } from './properties/line/line.component';
import { RadiusComponent } from './properties/radius/radius.component';
import { StoreModule } from '@ngrx/store';
import { patternReducer } from './store/pattern.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    LinksComponent,
    FooterComponent,
    CanvasComponent,
    CodeComponent,
    MainPropComponent,
    ManagementComponent,
    PreviewComponent,
    PropertiesComponent,
    ListComponent,
    ButtonsComponent,
    ControlsComponent,
    LinearComponent,
    RadialComponent,
    LineComponent,
    RadiusComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      pattern: patternReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
