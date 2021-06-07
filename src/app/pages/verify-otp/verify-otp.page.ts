import { DrvnAuthenticationService } from './../../services/auth/auth.service';

/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOTPPage implements OnInit {
  public obj = document.getElementById('partitioned');
  verificationForm: any;
  phone: string;
  hashCode = '';
  smsBody: string;
  code: any;
  recivedCode: any;
  secondsRemainingResendCode = 60;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  constructor(
    private util: UtilService,
    private menuCtrl: MenuController,
    private authService: DrvnAuthenticationService,
    private platform: Platform,
  ) {
    // this.inputFocus1 = true;
    this.menuCtrl.enable(false);
    setInterval(() => {
      if (this.secondsRemainingResendCode > 0) {
        this.secondsRemainingResendCode--;
      }

    }, 1000)
  }

  ngOnInit() {
    this.phone = this.authService.mobilePhone;
    this.hashCode = this.authService.hashCode;
    this.smsBody = this.authService.smsBody;

    if (!this.phone) {
      this.util.goToNew('signin')
    }

    if (this.platform.is('cordova')) {
      /*this.smsRetriever.startWatching()
        .then((res: any) => {
          if (res.Message) {
            var IncomingSMS = res.Message;
            IncomingSMS = IncomingSMS.replace(' '+this.hashCode,'');
            if (IncomingSMS.includes(this.smsBody)) {
              this.recivedCode = IncomingSMS.slice(-4);
              this.ngOtpInput.setValue(this.recivedCode);
              this.code = this.recivedCode;
              this.verification();
            }
          }
        })
        .catch((error: any) => console.error(error));*/
    }
  }

  onOtpChange(otp) {
    this.code = otp;
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

  verification() {
    if (this.platform.is('cordova')) {

    }
    this.authService.login(this.phone, this.code)
      .then(response => {
        setTimeout(() => {
          this.util.goToNew('/home');
        }, 1000);

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

  resendCode() {
    if (this.secondsRemainingResendCode == 0) {
      this.authService
        .sendCode(this.phone,this.hashCode)
        .then(async (response) => {
          this.secondsRemainingResendCode = 60;
          const toast = await this.util.createToast('Login code has been sent', true, 'bottom', 5000);
          toast.present();
        });
    }
  }

}
