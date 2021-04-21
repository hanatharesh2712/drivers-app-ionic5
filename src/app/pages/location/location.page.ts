/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  private lat: number;
  private long: number;

  constructor(
    private util: UtilService,
    public platform: Platform,
    private geolocation: Geolocation,
    private menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  locationTracking() {
    if (this.platform.is('cordova')) {
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log('getCurrentPosition', resp);
        this.util.goToNew('/register');
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      const watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        console.log('data', data);
      });
    } else {
      this.util.goToNew('/register');
    }
  }

  skip() {
    this.util.goToNew('/register');
  }
}
