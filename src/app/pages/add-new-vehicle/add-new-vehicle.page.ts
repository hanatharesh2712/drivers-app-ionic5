/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from '@env/environment';

@Component({
  selector: 'app-add-new-vehicle',
  templateUrl: './add-new-vehicle.page.html',
  styleUrls: ['./add-new-vehicle.page.scss'],
})
export class AddNewVehiclePage implements OnInit {
  public allVehicleData;
  public newVechicle = { license: '' };

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  getValueChange() {
  }

  addVehicle() {
    console.log(this.newVechicle);
    this.navCtrl.back();
  }
}
