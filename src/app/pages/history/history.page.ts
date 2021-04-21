/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { APIService } from '@app/services/api/api.service';
import { RideService } from '@app/services/ride/ride.service';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { UtilService } from '@app/services/util/util.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss']
})
export class HistoryPage implements OnInit {
  public monthDays: any;
  public selected: any;
  public rides: any;
  public totalEarning: any = 0;
  public loader: any;
  constructor(
    private api: APIService,
    public rideService: RideService,
    private userProvider: InitUserProvider,
    private util: UtilService
  ) {
    const days = [0, 1, 2, 3, 4, 5, 6];
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.monthDays = days.map(d => {
      return {
        day: dayOfWeek[new Date().getDay() - d >= 0 ? new Date().getDay() - d : new Date().getDay() - d + 7],
        date: new Date().getDate() - d > 0 ? new Date().getDate() - d : new Date().getDate() - d + this.daysInMonth(),
        selected: true
      };

    });
  }

  daysInMonth() {
    return new Date(new Date().getFullYear(), new Date().getMonth() - 1, 0).getDate();
  }
  ngOnInit() {
    this.selected = this.monthDays[0];
    const user = this.userProvider.getUserData();
    this.getHistory(user.id);
  }

  async getHistory(uid) {
    if (!this.loader) {
      this.loader = await this.util.createLoader('Loading Ride History ...');
      await this.loader.present();
    }
    this.api.getRideHistory(uid)
      .subscribe(rides => {
        if (rides.length) {
          this.rides = this.util.latLngConverterSQL(rides);
          this.rides = rides;
          for (let i = 0; i < rides.length; i++) {
            this.totalEarning += rides[i].fare;
          }
          this.loader.dismiss();
        } else {
          this.loader.dismiss();
        }
      });
  }

  weekChecked(i) {
    console.log('i', i);
    this.selected = i;
  }
}
