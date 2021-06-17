import { User } from '@app/models/user';
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
import { Driver } from '@app/models/driver';
import { DrvnAuthenticationService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public loggedInUser: User;
  public driverDocuments: Array<any> = [];
  public otherDetails: Array<any> = [];
  storageUrl: string = environment.storageUrl;
  constructor(
    private util: UtilService,
    private authService: DrvnAuthenticationService) { }

  ngOnInit() {
    this.loggedInUser = this.authService.currentUser;
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
