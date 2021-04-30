import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideOfferPage } from './ride-offer.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '@app/services/util/route.guard';

const routes: Routes = [
  {
    path: '',
    component: RideOfferPage,
    canActivate: [RouteGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RideOfferPage],
})
export class RideOfferPageModule { }
