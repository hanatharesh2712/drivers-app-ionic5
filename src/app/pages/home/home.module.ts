
import { RouteGuard } from './../../services/util/route.guard';
import { RideMapModule } from './../../components/ride-map/ride-map.module';
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
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'
import { HomePage } from './home.page';
import { SettleDialogModule } from '@app/components/settle-dialog/settle-dialog.module';
import { RatingDialogModule } from '@app/components/rating-dialog/rating-dialog.module';
import { PipesModule } from '@app/pipes/pipes.module';
import { RoutingDetailsModule } from '@app/components/routing-details/routing-details.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    AgmDirectionModule,
    RideMapModule,
    RoutingDetailsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        canActivate: [RouteGuard]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
