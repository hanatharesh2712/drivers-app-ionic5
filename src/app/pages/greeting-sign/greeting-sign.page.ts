/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Ride } from '@app/models/ride';
import { ModalController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { UtilService } from '@app/services/util/util.service';
@Component({
  selector: 'app-greeting-sign',
  templateUrl: './greeting-sign.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./greeting-sign.page.scss'],
})
export class GreetingSignPage implements OnInit, OnDestroy {
  ride: Ride;
  constructor(
    private screenOrientation: ScreenOrientation,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private clipboard: Clipboard,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.statusBar.backgroundColorByHexString('#000000');
  }

  openUrl(url) {
    window.open(url);
  }

  ngOnDestroy(): void {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.statusBar.backgroundColorByHexString('#bb9669');
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async copyToClipboard()
  {
    this.clipboard.copy(this.ride.greeting_link);
    const toast = await this.util.createToast(
      'Greeting sign link has been copied.',
      false,
      'top',
      4000
    );
    toast.present();
  }
}
