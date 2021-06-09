import { RouteGuard } from '@app/services/util/route.guard';

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
import { Routes, RouterModule } from '@angular/router';
import { CovidTermsPage } from './covid-terms.page';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: CovidTermsPage,
    canActivate: [RouteGuard]
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CovidTermsPage]
})
export class CovidTermsPageModule { }
