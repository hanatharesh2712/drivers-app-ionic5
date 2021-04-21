/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { RideService } from '@app/services/ride/ride.service';
import { environment } from '@env/environment';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-customer-request',
  templateUrl: './customer-request.page.html',
  styleUrls: ['./customer-request.page.scss'],
})
export class CustomerRequestPage implements OnInit {

  public userRequests: Array<any> = [];

  constructor(
    private util: UtilService,
    private rideService: RideService
  ) { }

  ngOnInit() {
    this.userRequests = environment.USER_REQUESTS;
  }

  userRiderDetails(index) {

    this.userRequests.map((el, i) => {
      if (index === i) {
        this.userRequests[index].checked = !this.userRequests[index].checked;
      } else {
        el.checked = false;
      }
    });
  }

  requestAccept() {
    this.rideService.userCard = true;
    this.util.goToNew('/home');
  }
  requestCancel() {
    this.rideService.userCard = false;
    this.util.goToNew('/home');
  }


}
