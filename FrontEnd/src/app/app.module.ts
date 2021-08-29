import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

import { AppComponent } from './app.component';

import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
// import { ApiModule } from './shared/sdk';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from './shared/sdk1/api.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutesModule,
    SharedModule.forRoot(),
    LayoutModule,
    ApiModule.forRoot({rootUrl: "http://localhost:3000"})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
