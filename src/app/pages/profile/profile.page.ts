import { User } from '@app/models/user';
import { DrvnAuthenticationService } from './../../services/auth/auth.service';

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
import { Driver } from '@app/models/driver';
import { UtilService } from '@app/services/util/util.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public loggedInUser: User;
  storageUrl: string = environment.storageUrl;
  constructor(
    private authService: DrvnAuthenticationService,
    private util: UtilService,
    private menu: MenuController
  ) {

    this.menu.close();
  }

  ionViewDidEnter(){
    this.loggedInUser = this.authService.currentUser;
  }

  editProfile() {
    this.util.goForward('/edit-profile');
  }

}
