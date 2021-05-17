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
import { MenuController } from '@ionic/angular';
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

  constructor(
    private route: Router,
    private menuCtrl: MenuController,
    private authService: DrvnAuthenticationService,
    private util: UtilService
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  setSpinner() {
    this.spinner = true;
    this.disabled = true;
  }

  clearSpinner() {
    this.spinner = false;
    this.disabled = false;
  }

  login() {
    this.setSpinner();

    this.authService
      .sendCode(this.phone)
      .then(
        async res => {
            if (res.status.toUpperCase() == 'SUCCESS')
            {
              this.util.goForward('verify-otp', {phone: this.phone})
              this.clearSpinner();
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
  register() {
    this.util.goToNew('/register');
  }
}
