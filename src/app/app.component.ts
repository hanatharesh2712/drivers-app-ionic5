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
    public rideService: RideService
  ) {
    this.initializeApp();
    this.loggedInUser = this.userProvider.getUserData();
    console.log('user', this.loggedInUser);

    if (!this.loggedInUser.id) {
      this.util.goToNew('/login');
    } else if (!this.loggedInUser['approved']) {
      this.util.goToNew('/approved');
    } else {
      this.util.goToNew('/home');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (environment.GOOGLE_MAPS_API_KEY && environment.GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY') {
        this.showAPIKeyAlert();
      }
    });
  }

  profile() {
    this.util.goForward('/profile');
  }

  redirectTo(page) {
    this.util.goForward(`/${page.url}`);
  }

  logout() {
    this.userProvider.logout().then(res => {
      console.log(res);
      this.util.goToNew('/login');
    });
  }

  async showAPIKeyAlert() {

    const cancelAlert = await this.util.createAlert(
      'Wait!',
      false,
      'You have not entered your Maps API key in environment. Make sure you enter the API key in both debug and prod environment, config.xml and package.json. Read more in the documentation or README.md of source code.',
      {
        text: 'Ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async () => {
        }
      }
    );
    await cancelAlert.present();
  }
}
