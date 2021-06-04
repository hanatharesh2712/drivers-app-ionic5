
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
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { RideService } from '@app/services/ride/ride.service';
import { UtilService } from '@app/services/util/util.service';
import { RideMapComponent } from '@app/components/ride-map/ride-map.component';
import { Ride } from '@app/models/ride';
import { NextRideResponse } from '@app/models/rides-wrapper.models';
import { environment } from '@env/environment';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { ReviewsService } from '@app/services/reviews.service';
import { DrvnAuthenticationService } from '@app/services/auth/auth.service';
import { GeolocationService } from '@app/services/geolocation.service';

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
  score: any;
  vehicleScore: any;
  loggedInUser: any;
  constructor(
    private menuCtrl: MenuController,
    private rideService: RideService,
    private util: UtilService,
    private ridesService: RideService,
    private reviewsService: ReviewsService,
    private insomnia: Insomnia,
    private authService: DrvnAuthenticationService,
    private geolocationService: GeolocationService
  ) {}

  async ngOnInit() {
    this.insomnia.keepAwake().then(
      () => console.log('success'),
      () => console.log('error')
    );
  }

  onClickGetCurrentPosition() {
    this.geolocationService.getCurrentLocation();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
    this.loggedInUser = this.authService.currentUser;
    this.loadInfo();
    //  }
  }

  loadInfo(refresher = null)
  {
    this.loadingRide = true;
    this.ridesService.getNextRide().subscribe((response: NextRideResponse) => {
      this.loadingRide = false;
      if (response.ride) {
        this.nextRide = response.ride;
      }
    }, error =>
    {
      this.loadingRide = false;
    });
    this.ridesService.getRides().subscribe(rides => {
      this.rides = rides;
      if (refresher) {
        refresher.target.complete();
      }
    })
    this.reviewsService.getPaxReviews().subscribe(
      res => {
        this.score = this.reviewsService.score;
        this.vehicleScore = this.reviewsService.vehicleScore;
      },
    );
  }


  ionViewWillLeave() {}

  async cancelRide() {}

  goToCustomerDetail() {
    this.util.goForward('/customer-detail');
  }

  async requestIgnore() {
    this.util.goForward('/customerRequest');
  }



  goTo(route)
  {
    this.util.goForward(route);
  }

}
