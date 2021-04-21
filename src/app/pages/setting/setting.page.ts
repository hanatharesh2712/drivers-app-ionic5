/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { UtilService } from '@app/services/util/util.service';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { Driver } from '@app/models/driver';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public loggedInUser: Driver;
  public driverDocuments: Array<any> = [];
  public otherDetails: Array<any> = [];

  constructor(
    private util: UtilService,
    private userProvider: InitUserProvider) { }

  ngOnInit() {
    this.loggedInUser = this.userProvider.getUserData();
    this.driverDocuments = environment.DRIVER_DOCUMENT_SETTINGS;
    this.otherDetails = environment.OTHER_SETTINGS;
  }

  goToProfile() {
    this.util.goForward('/profile');
  }
  documentPage(page) {
    if (page) {
      this.util.goForward(`/${page}`);
      console.log(page);
    }
  }
  otherPage(page) {
    if (page) {
      this.util.goForward(`/${page}`);
    }
  }
}
