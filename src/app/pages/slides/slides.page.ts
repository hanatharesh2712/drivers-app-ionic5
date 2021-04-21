/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
  slideOpts = {
    effect: 'flip',
  };

  constructor(
    private util: UtilService,
    private menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  sliderChanges(event) {
    console.log('sliderChanges', event);
  }

  skip() {
    this.util.goForward('/location');
  }

  locationPage() {
    this.util.goForward('/location');
  }


}
