import { DirectivesModule } from '@app/directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideDetailPage } from './ride-detail.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '@app/services/util/route.guard';
import { RoutingDetailsModule } from '@app/components/routing-details/routing-details.module';
import { PipesModule } from '@app/pipes/pipes.module';
import { SettleDialogModule } from '@app/components/settle-dialog/settle-dialog.module';
import { EventsTimelineModule } from '@app/components/events-timeline/events-timeline.module';
import { RidePricingPopoverModule } from '@app/components/ride-pricing-popover/ride-pricing-popover.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RideMapDialogModule } from '@app/components/ride-map-dialog/ride-map-dialog.module';
import { RideMapModule } from '@app/components/ride-map/ride-map.module';
import { NgxCurrencyModule } from "ngx-currency";
const routes: Routes = [
  {
    path: ':ride_id',
    component: RideDetailPage,
    canActivate: [RouteGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    RideMapDialogModule,
    ReactiveFormsModule,
    RideMapModule,
    NgxCurrencyModule,
    RouterModule.forChild(routes),
    RoutingDetailsModule,
    EventsTimelineModule,
    RidePricingPopoverModule,
    SettleDialogModule,
    DirectivesModule
  ],
  declarations: [RideDetailPage],
})
export class RideDetailPageModule { }
