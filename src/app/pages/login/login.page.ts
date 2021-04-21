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
import { APIService } from '@app/services/api/api.service';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public email = '';
  public password = '';
  public spinner = false;
  public disabled = false;

  constructor(
    private route: Router,
    private menuCtrl: MenuController,
    private api: APIService,
    private userProvider: InitUserProvider,
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

    this.api
      .logIn(this.email, this.password)
      .subscribe(
        res => {
          this.userProvider.setToken(res['id']);
          this.api.getDriver().subscribe((user: any) => {
            this.userProvider.setLoggedInUser(user);
            this.clearSpinner();
            if (!user['approved']) {
              this.util.goToNew('/approved');
            } else {
              this.util.goToNew('/home');
            }
          });
        },
        async err => {
          const toast = await this.util.createToast(err.message, false, 'top');
          await toast.present();
          this.clearSpinner();
        }
      );
  }
  register() {
    this.util.goToNew('/register');
  }
}
