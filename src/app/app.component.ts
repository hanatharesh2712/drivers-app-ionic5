import { DrvnAuthenticationService } from './services/auth/auth.service';
/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './models/user';
import { UtilService } from './services/util/util.service';
import { RideService } from './services/ride/ride.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'other_houses'
    },
    {
      title: 'Rides',
      url: '/rides/accepted',
      icon: 'directions_car'
    },
    {
      title: 'Reviews',
      url: '/my-reviews',
      icon: 'star_border'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'account_circle'
    },
    {
      title: 'Support',
      url: '/contact',
      icon: 'contact_support'
    },

  ];
  public loggedInUser: User;
  storageUrl: string = environment.storageUrl;
  version: string;

  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public util: UtilService,
    public rideService: RideService,
    private authService: DrvnAuthenticationService,
  ) {
    this.initializeApp();
    this.loggedInUser = this.authService.currentUser;
    this.authService.onLogin.subscribe(data => {
      if (data) {
        this.loggedInUser = data;
      }
    });


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.version = '2.1.4';
    });
  }

  profile() {
    this.util.goForward('profile');
  }

  redirectTo(page) {
    this.util.goForward(`${page.url}`);
  }

  logout() {
    this.authService.logout()
    this.util.goToNew('login');
  }


}
