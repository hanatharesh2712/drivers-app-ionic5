
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
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOTPPage implements OnInit {
  public obj = document.getElementById('partitioned');
  public inputFocus1: boolean;
  public inputFocus2: boolean;
  public inputFocus3: boolean;
  public inputFocus4: boolean;
  public otpInput1: any;
  public otpInput2: any;
  public otpInput3: any;
  public otpInput4: any;

  constructor(
    private util: UtilService,
    private menuCtrl: MenuController
  ) {
    // this.inputFocus1 = true;
    this.inputFocus2 = true;
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  verify() {
    this.util.goToNew('/home');
  }

  onchange(num) {
    console.log('change', num, typeof num);
    if (num === 1) {
      this.inputFocus1 = false;
      this.inputFocus2 = true;
    } else if (num === 2) {
      this.inputFocus3 = true;
    } else if (num === 3) {
      this.inputFocus4 = true;
    } else {
      this.inputFocus1 = false;
      this.inputFocus2 = false;
      this.inputFocus3 = false;
      this.inputFocus4 = false;
    }

  }
  next(el, val) {
    const numberRegex = /^[0-9\s]*$/;
    const regexp = /^\S*$/;
    if (val === '1' && numberRegex.test(this.otpInput1) && regexp.test(this.otpInput1)) {
      el.setFocus();
    } else if (val === '2' && numberRegex.test(this.otpInput2) && regexp.test(this.otpInput2)) {
      el.setFocus();
    } else if (val === '3' && numberRegex.test(this.otpInput3) && regexp.test(this.otpInput3)) {
      el.setFocus();
    }

  }
  preview(el) {
    if (el === 'otp4') {
      el.setFocus();
    }
  }

}
