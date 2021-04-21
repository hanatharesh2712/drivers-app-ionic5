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
  ) {
    this.loggedInUser = this.userProvider.getUserData();
    this.driverAvailable = this.loggedInUser.available;
    this.rideStage = this.rideService.rideStage;
    this.mapData = this.rideService.mapData;
  }

  async ngOnInit() {
    const rideId = await this.rideService.getRideId();
    if (rideId) {
      this.rideService.checkIfExistingRide(rideId);
    } else {
      this.rideService.load();
    }
  }

  ionViewDidEnter() {
    console.log('ionviewenter');
    this.menuCtrl.enable(true);
  }

  ionViewWillLeave() {
    this.rideService.clearIncomingRideListener();
    this.rideService.clearRideStatusListener();
  }

  async cancelRide() {
    await this.rideService.showDriverCanceledRideAlert();
  }

  mapReady(a, event) {
    if (event) {
      console.log('event if');
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log(
      'dragEnd',
      $event,
      '$event.coords.lat',
      $event.coords.lat,
      '$event.coords.lng',
      $event.coords.lng
    );
    this.rideService.mapData.lat = $event.coords.lat;
    this.rideService.mapData.lng = $event.coords.lng;
  }

  driverStatusChange(event) {
    if (event.detail.checked) {
      if (!this.listenerId) { this.rideService.setIncomingRideListener(); }
    } else {
      this.rideService.clearIncomingRideListener();
    }
    this.loggedInUser.available = event.detail.checked;
    this.api.updateDriverData(this.loggedInUser.id, { available: event.detail.checked })
      .subscribe(driver => {
        console.log(driver);
      }, err => console.log(err));

  }

  goToCustomerDetail() {
    this.util.goForward('/customer-detail');
  }

  async requestIgnore() {
    this.util.goForward('/customerRequest');
  }


}
