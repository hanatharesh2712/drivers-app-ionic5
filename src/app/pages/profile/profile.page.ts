
/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { Driver } from '@app/models/driver';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public loggedInUser: Driver;
  constructor(
    private userProvider: InitUserProvider,
    private util: UtilService,
    private menu: MenuController
  ) {
    this.loggedInUser = this.userProvider.getUserData();
    this.menu.close();
  }

  ngOnInit() {
  }

  editProfile() {
    this.util.goForward('/edit-profile');
  }

}
