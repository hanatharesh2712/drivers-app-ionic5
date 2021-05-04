/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { UtilService } from '@app/services/util/util.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.page.html',
  styleUrls: ['./approved.page.scss']
})
export class ApprovedPage implements OnInit {
  constructor(
    private util: UtilService,
    private menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  logout() {
  // this.userProvider.logout().then(res => {
  //   this.util.goToNew('/login');
  // });
  }
}
