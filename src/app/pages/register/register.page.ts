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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  public spinner = false;
  public disabled = false;
  public user = { name: '', email: '', password: '' };

  constructor(
    private route: Router,
    private menuCtrl: MenuController,
    private api: APIService,
    private util: UtilService,
    private userProvider: InitUserProvider,
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    const user = this.userProvider.getUserData();
    this.spinner = false;
    this.disabled = false;
    if (!user.id) {
      // this.route.navigate(['home'])
    } else if (user['approved']) {
      this.util.goToNew('/home');
    } else if (!user['approved']) {
      this.util.goToNew('/approved');
    }
  }

  setSpinner() {
    this.spinner = true;
    this.disabled = true;
  }

  clearSpinner() {
    this.spinner = false;
    this.disabled = false;
  }

  register() {
    this.setSpinner();

    this.api
      .signUp(this.user)
      .subscribe(
        res => {
          this.userProvider.setToken(res['id']);
          this.api.getDriver().subscribe((user: any) => {
            this.userProvider.setLoggedInUser(user);
            this.clearSpinner();
            this.util.goToNew('/approved');
          });
        },
        async err => {
          const toast = await this.util.createToast(err.message, false, 'top');
          await toast.present();
          this.clearSpinner();
        }
      );

  }

  login() {
    this.util.goToNew('/login');
  }
}
