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
import { environment } from '@env/environment';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.page.html',
  styleUrls: ['./document-management.page.scss'],
})
export class DocumentManagementPage implements OnInit {
  public documents = [];
  constructor(public util: UtilService) { }

  ngOnInit() {
  }

  gotoPage(item: any) {
    this.util.goForward(`/${item}`);
  }
}
