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
@Component({
  selector: 'app-driving-license',
  templateUrl: './driving-license.page.html',
  styleUrls: ['./driving-license.page.scss'],
})
export class DrivingLicensePage implements OnInit {
  public documents = [
    {
      'name': 'Update Profile',
      'icon': 'person',
    }
  ]
  cardNumber: any = '';
  expiryDate: any = '';
  photos: any = [];

  constructor(private util: UtilService) { }

  ngOnInit() {
  }

  async openActionsheet() {
    const action = await this.util.createActionSheet({
      text: 'Take a Picture',
      role: 'destructive',
      cssClass: 'buttonCss',
      handler: () => {
     ///   this.userProvider.openCamera();
      }
    }, {
      text: 'Pick From Gallery',
      handler: () => {
    //    this.userProvider.openGallery();
      }
    }, {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'buttonCss_Cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    });

    await action.present();
  }


}
