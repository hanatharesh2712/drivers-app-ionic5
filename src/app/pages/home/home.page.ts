import { SettleDialogComponent } from './../../components/settle-dialog/settle-dialog.component';
import { GeolocationService } from './../../services/geolocation.service';
/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { MenuController, NavParams, PopoverController } from '@ionic/angular';
import { RideService } from '@app/services/ride/ride.service';
import { APIService } from '@app/services/api/api.service';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { UtilService } from '@app/services/util/util.service';
import { Driver } from '@app/models/driver';
import { RideMapComponent } from '@app/components/ride-map/ride-map.component';
import { Ride } from '@app/models/ride';
import { NextRideResponse } from '@app/models/rides-wrapper.models';
import { environment } from '@env/environment';
import { ChildSeatDialogComponent } from '@app/components/child-seat-dialog/child-seat-dialog.component';
import { RatingDialogComponent } from '@app/components/rating-dialog/rating-dialog.component';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  @ViewChild(RideMapComponent, { static: true }) rideMap: RideMapComponent;
  map: any;
  currentPos: Location;
  driverMarker: any;
  autofollow: boolean = true;
  currentUser: any;
  storageUrl: string = environment.storageUrl;
  ride: Ride;
  viewType: 'actual' | 'info' | 'offer' | 'none' = 'none';
  infoExpanded: boolean;
  isDone: boolean;
  constructor(
    private menuCtrl: MenuController,
    private rideService: RideService,
    private api: APIService,
    private userProvider: InitUserProvider,
    private util: UtilService,
    private geolocationService: GeolocationService,
    private ridesService: RideService,
    private popoverController: PopoverController,
    private insomnia: Insomnia
  ) {

  }

  async ngOnInit() {
    this.geolocationService.initTracking();
    this.insomnia.keepAwake()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);

    this.ridesService.getNextRide().subscribe((response: NextRideResponse) => {
      if (response.ride) {
        this.handleRide(response.ride);
      }
    })
    //  }
  }

  handleRide(ride) {
    this.ride = { ...ride };
  }

  async openChildSeatInfo(ev: any) {
    const popover = await this.popoverController.create({
      component: ChildSeatDialogComponent,
      cssClass: 'my-custom-class',
      event: ev,
      componentProps: {
        child_seats: this.ride.child_seats
      },
      translucent: true
    });
    await popover.present();

  }

  ionViewWillLeave() {

  }

  async cancelRide() {

  }


  goToCustomerDetail() {
    this.util.goForward('/customer-detail');
  }

  async requestIgnore() {
    this.util.goForward('/customerRequest');
  }

  async changeStatus() {
    this.rideService.changeStatus(this.ride).then(response => {
      if (response)
        {
          this.handleRide(response);
        }
        else
        {
          this.isDone =true;
          this.openRating();
        }
    });
  }


  acceptRide() {
    this.rideService.acceptRide(this.ride).then(response => {
      if (response) {
        this.handleRide(response);
      }

    });
  }

 async  openRating()
  {
    let dialog = await this.util.createModal(RatingDialogComponent, { ride: this.ride}, 'rating-modal');
    dialog.present();

  }

  async  openSettle()
  {
    let dialog = await this.util.createModal(SettleDialogComponent, { ride: this.ride}, 'settle-modal');
    dialog.present();

  }
}
