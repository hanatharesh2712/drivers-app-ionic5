import { GeolocationService } from './../../services/geolocation.service';
/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { MenuController } from '@ionic/angular';
import { RideService } from '@app/services/ride/ride.service';
import { APIService } from '@app/services/api/api.service';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { UtilService } from '@app/services/util/util.service';
import { Driver } from '@app/models/driver';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public loggedInUser: Driver; // user data
  public listenerId;
  public driverAvailable;
  public rideStage;
  public mapData;

  constructor(
    private menuCtrl: MenuController,
    private rideService: RideService,
    private api: APIService,
    private userProvider: InitUserProvider,
    private util: UtilService,
    private geolocationService: GeolocationService
  ) {

  }

  async ngOnInit() {
    this.geolocationService.initTracking();
  }

  ionViewDidEnter() {
    console.log('ionviewenter');
    this.menuCtrl.enable(true);
  }

  ionViewWillLeave() {

  }

  async cancelRide() {

  }


  goToCustomerDetail() {
    this.util.goForward('/customer-detail');
  }

  async requestIgnore() {
    this.util.goForward('/customerRequest');
  }


}
