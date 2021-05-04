
/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit, OnChanges } from '@angular/core';
import { environment } from '@env/environment';
import { UtilService } from '@app/services/util/util.service';
import { RideService } from '@app/services/ride/ride.service';
import { Driver } from '@app/models/driver';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit, OnChanges {
  public walletData: any = [];
  public walletPage: any = 'cash';
  public loggedInuser: Driver;
  constructor(
    private util: UtilService,
    private rideService: RideService
  ) {
    this.getHistory(this.loggedInuser.id);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed button clicked', ev);
  }

  async getHistory(uid) {
    const loader = await this.util.createLoader('Loading Ride History ...');
    await loader.present();


  }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log('change');
  }

}
