import { DrvnAuthenticationService } from './../../services/auth/auth.service';

/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UtilService } from '@app/services/util/util.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  encapsulation: ViewEncapsulation.None,
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
  verificationForm: any;
  phone: string;
  code: any;

  constructor(
    private util: UtilService,
    private menuCtrl: MenuController,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: DrvnAuthenticationService
  ) {
    // this.inputFocus1 = true;
    this.inputFocus2 = true;
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.phone = this.authService.mobilePhone;

    if (!this.phone) {
      this.util.goToNew('signin')
    }


  }

  onOtpChange(otp) {
    this.code = otp;
  }



  verification() {
    this.authService.login(this.phone, this.code)
      .then(response => {
        setTimeout(() => {
          this.util.goToNew('/home');
        }, 500);

      }).catch(async (err) => {
        let error_msg = 'An error ocurred, try again later.';
        if (err.status == 401) {
          error_msg = 'Invalid code';
        }
        let alert = await this.util.createAlert('Sign in', true, error_msg, {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {

          }
        });
        await alert.present();
      });
  }

}
