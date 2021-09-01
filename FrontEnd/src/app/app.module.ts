import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

import { AppComponent } from './app.component';

import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from './shared/sdk/api.module';
import { Configuration } from './shared/sdk';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './shared/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './shared/store/reducers/user.reducer';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';

const apiConf = () => {
  return new Configuration({ basePath: "http://localhost:3000" })
};

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
    ApiModule.forRoot(apiConf),
    StoreModule.forRoot(reducers,
      {
        metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictActionTypeUniqueness: true,
          strictStateImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true,
          strictActionWithinNgZone: true,
        }
      }
    ),
    StoreDevtoolsModule.instrument(
      {
        maxAge: 25,
        logOnly: environment.production,
        autoPause: true
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(
      {
        stateKey: 'router',
        routerState: RouterState.Minimal
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
