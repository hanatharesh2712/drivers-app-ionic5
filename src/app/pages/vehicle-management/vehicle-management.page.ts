/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-vehiclemanagement',
  templateUrl: './vehicle-management.page.html',
  styleUrls: ['./vehicle-management.page.scss'],
})
export class VehicleManagementPage implements OnInit {
  public vehicleList = environment.VEHICLE_LIST;

  constructor(
    public nativePageTransitions: NativePageTransitions,
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  openpageTransition() {
    this.util.goForward('/addnewvehicle');
  }

}
