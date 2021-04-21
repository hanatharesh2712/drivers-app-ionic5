
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
import { APIService } from '@app/services/api/api.service';
import { UtilService } from '@app/services/util/util.service';
import { RideService } from '@app/services/ride/ride.service';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
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
    private api: APIService,
    private util: UtilService,
    private rideService: RideService,
    private userProvider: InitUserProvider
  ) {
    this.loggedInuser = this.userProvider.getUserData();
    this.getHistory(this.loggedInuser.id);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed button clicked', ev);
  }

  async getHistory(uid) {
    const loader = await this.util.createLoader('Loading Ride History ...');
    await loader.present();

    this.api.getRideHistory(uid)
      .subscribe(rides => {
        if (rides.length) {
          this.walletData = rides;
        }
        console.log(this.walletData);
        let total = 0;
        for (let i = 0; i < this.walletData.length; i++) {
          total = total + this.walletData[i].fare
        }
        this.rideService.stats.totalFare = total;
        loader.dismiss();
      });
  }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log('change');
  }

}
