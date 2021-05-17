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
import { PaymentsService } from '@app/services/payments.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit, OnChanges {
  public walletData: any = [];
  public walletPage: any = 'cash';
  public loggedInuser: Driver;
  payments: any;
  total: any;
  loading = false;
  constructor(
    private util: UtilService,
    private rideService: RideService,
    private paymentsService: PaymentsService
  ) {
    this.getPayments();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed button clicked', ev);
  }

  async getPayments() {
    this.loading = true;

    this.paymentsService.getPayments().subscribe((payments) => {
      console.log(payments);
      this.payments = payments;
      this.total = this.paymentsService.total;
      this.loading = false;
    });
  }


  ngOnInit() {}
  ngOnChanges() {
    console.log('change');
  }
}
