import { UtilService } from '@app/services/util/util.service';
/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  drvnNumber = environment.drvnSupportNumber;
  type = '';
  constructor(private util: UtilService) {}
  ngOnInit() {}

  openUrl(url) {
    window.open(url);
  }

  goToSendEmail() {
    this.util.goForward('send-email');
  }

  goToFaq() {
    this.util.goForward('FAQ');
  }
  callSuport() {
    this.util.callSuport();
  }
}
