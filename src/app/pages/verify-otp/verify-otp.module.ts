/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerifyOTPPage } from './verify-otp.page';
import { NgOtpInputModule } from  'ng-otp-input';

const routes: Routes = [
  {
    path: '',
    component: VerifyOTPPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgOtpInputModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerifyOTPPage]
})
export class VerifyOTPPageModule { }
