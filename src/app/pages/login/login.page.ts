import { DrvnAuthenticationService } from './../../services/auth/auth.service';
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
import { MenuController, Platform } from '@ionic/angular';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public phone = '';
  public spinner = false;
  public disabled = false;
  public hashCode = '';
  mobile_mask: string;

  constructor(
    private route: Router,
    private menuCtrl: MenuController,
    private authService: DrvnAuthenticationService,
    private util: UtilService,
    private platform: Platform,
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    if (this.platform.is('cordova')) {
      /*this.smsRetriever.getAppHash()
        .then((res: any) => {
          this.hashCode = res;
          console.log(this.hashCode);
        })
        .catch((error: any) => console.error(error));*/
    }
  }


  login() {
    this.spinner = true;

    this.authService
      .sendCode(this.phone,this.hashCode)
      .then(
        async res => {
            if (res.status.toUpperCase() == 'SUCCESS')
            {
              this.util.goForward('verify-otp', {phone: this.phone, hashCode: this.hashCode})
              this.spinner = false;
            }
            else
            {
                this.showError();
            }
        },
        async err => {
          this.showError();
        }
      );
  }

  async showError()
  {
    let alert = await this.util.createAlert('Sign in', true, 'Invalid phone number. Please try again.', {
      text: 'Ok',
      role: 'cancel',
      cssClass: 'secondary',
      handler: async () => {

      }
    });
  }
  goToRegister() {
    this.util.goToNew('/register/mobile-validation');
  }

  onMobileChange(value): void {
    if (value === '') {
        this.mobile_mask = '';
    }
    else {
        if (value.charAt(0) === '+' && this.mobile_mask !== '') {
            this.mobile_mask = '';
        }
        else if (isFinite(value.charAt(0)) && this.mobile_mask !== '(000) 000-0000') {
            this.mobile_mask = '(000) 000-0000';
        }
    }
}
}
