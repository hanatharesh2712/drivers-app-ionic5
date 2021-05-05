import { SettleDialogModule } from '@app/components/settle-dialog/settle-dialog.module';
import { RatingDialogModule } from './components/rating-dialog/rating-dialog.module';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { RouteGuard } from './services/util/route.guard';
/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { environment } from '@env/environment';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { AgmDirectionModule } from 'agm-direction';
import { DrvnAuthenticationService } from './services/auth/auth.service';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationService } from './services/geolocation.service';
import { AuthHttpInterceptor } from './services/util/http-interceptor';
import { RideMapDialogModule } from './components/ride-map-dialog/ride-map-dialog.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(
      {
        name:'drvn_app',
        driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
      }
    ),
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ['places']
    }),
    AgmDirectionModule,
    AppRoutingModule,
    HttpClientModule,
    RideMapDialogModule,
    RatingDialogModule,
    SettleDialogModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    RouteGuard,
    GoogleMapsAPIWrapper,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    BackgroundGeolocation,
    DrvnAuthenticationService,
    GeolocationService,
    Insomnia,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
  },
    { provide: APP_INITIALIZER, useFactory: initUserProviderFactory, deps: [DrvnAuthenticationService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initUserProviderFactory(provider: DrvnAuthenticationService) {
  return () => provider.initUser();
}
