/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./send-email.page.scss'],
})
export class SendEmailPage implements OnInit {

  description = '';
  type = 'chauffeur';
  ngOnInit() {
  }

  openUrl(url) {
    window.open(url);
  }

}
