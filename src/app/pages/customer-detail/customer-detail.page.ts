/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { UtilService } from '@app/services/util/util.service';
import { RideService } from '@app/services/ride/ride.service';
import { Driver } from '@app/models/driver';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {
  public tripPayments: Array<any> = [];
  public loggedInUser: Driver;
  public mapData;

  constructor(
    private route: Router,
    private util: UtilService,
    public rideService: RideService
  ) { }

  ngOnInit() {
    this.tripPayments = environment.TRIP_PAYMENTS;
  }

  startNavigationToPickup() {
    this.util.startNavigationToPickup(this.mapData.driverLocation, this.mapData.origin);
  }

  callUser(phone) {
    this.util.call(phone);
  }

  chatWithUser() {
    this.util.goForward('/chat');
  }

  async userCancel() {
    // const alert = await this.util.createAlert(
    //   'Cancel Request',
    //   false,
    //   environment.DRIVER_CANCEL_MSG,
    //   {
    //     text: 'Cancel',
    //     role: 'cancel',
    //     cssClass: 'secondary',
    //     handler: (cancel) => {
    //       console.log('Confirm Cancel');
    //     }
    //   },
    //   {
    //     text: 'Okay',
    //     handler: () => {
    //       this.util.goForward('/customerRequest');
    //     }
    //   }
    // );

    // await alert.present();
  }


}
