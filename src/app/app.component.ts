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
import { InitUserProvider } from '@app/services/inituser/inituser.service';
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
      icon: 'home'
    },
    {
      title: 'My Wallet',
      url: '/wallet',
      icon: 'wallet'
    },
    {
      title: 'History',
      url: '/history',
      icon: 'time'
    },
    { title: 'Notifications', url: '/notifications', icon: 'notifications' },
    {
      title: 'Invite Friends',
      url: '/invite',
      icon: 'gift'
    },
    {
      title: 'Settings',
      url: '/setting',
      icon: 'settings'
    }
  ];
  public loggedInUser: User;
  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public util: UtilService,
    public userProvider: InitUserProvider,
    public rideService: RideService,
    private authService: DrvnAuthenticationService
  ) {
    this.initializeApp();
    this.authService.onLogin.subscribe(data => {
      if (data) {
        this.loggedInUser = data;
      }

    });

    this.authService.getCurrentDriverInfo().then(response => {
      if (response) {
        this.util.goToNew('/home');
      }

    }, error => {
      this.util.goToNew('/login');
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  profile() {
    this.util.goForward('profile');
  }

  redirectTo(page) {
    this.util.goForward(`${page.url}`);
  }

  logout() {
    this.userProvider.logout().then(res => {
      console.log(res);
      this.util.goToNew('login');
    });
  }


}
