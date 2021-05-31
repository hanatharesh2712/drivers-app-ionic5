
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
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WalletPage } from './wallet.page';
import { PipesModule } from '@app/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: WalletPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WalletPage]
})
export class WalletPageModule { }
