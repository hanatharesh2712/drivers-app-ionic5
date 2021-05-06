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

import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MenuController, NavParams, PopoverController } from '@ionic/angular';
import { RideService } from '@app/services/ride/ride.service';
import { UtilService } from '@app/services/util/util.service';
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
  styleUrls: ['home.page.scss'],
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
  nextRide: Ride;
  rides: Ride[];
  loadingRide: boolean;
  loadingRideBoard: boolean;
  constructor(
    private menuCtrl: MenuController,
    private rideService: RideService,
    private util: UtilService,
    private ridesService: RideService,
    private popoverController: PopoverController,
    private insomnia: Insomnia
  ) {}

  async ngOnInit() {
    this.insomnia.keepAwake().then(
      () => console.log('success'),
      () => console.log('error')
    );
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);

    this.loadingRide = true;
    this.ridesService.getNextRide().subscribe((response: NextRideResponse) => {
      this.loadingRide = false;
      if (response.ride) {
        this.nextRide = response.ride;
      }
    });
    this.ridesService.getRides().subscribe(rides => {
      this.rides = rides;
    })
    //  }
  }


  ionViewWillLeave() {}

  async cancelRide() {}

  goToCustomerDetail() {
    this.util.goForward('/customer-detail');
  }

  async requestIgnore() {
    this.util.goForward('/customerRequest');
  }

  goToNextRide()
  {
    this.util.goForward('ride/' + this.nextRide.ride_id);
  }

  goToRides(type)
  {
    this.util.goForward('rides/' + type);
  }

}
