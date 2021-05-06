import { UtilService } from '@app/services/util/util.service';
import { RideService } from '@app/services/ride/ride.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DrvnAuthenticationService } from '@app/services/auth/auth.service';
import { Ride } from '@app/models/ride';
import { Router } from '@angular/router';

@Component({
  selector: 'page-my-rides',
  templateUrl: './my_rides.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./my_rides.component.scss']
})
export class MyRidesPageComponent  {

  segmentModel: 'offers' | 'accepted' | 'done' = "offers";
  rides: Ride[];
  selectedTab;
  ridesOffers: Ride[] = [];
  ridesAccepted: Ride[] = [];
  ridesDone: Ride[] = [];
  constructor(private ridesService: RideService, private authService: DrvnAuthenticationService,
    private util: UtilService,
    private router: Router) {

  }

  ionViewDidEnter() {
    this.getRides(this.authService.currentUser.id, null);
  }

  async getRides(driver_id, refresher) {

    this.ridesService.getRides().subscribe(
      (res: any) => {
        this.filterRides(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  filterRides(res) {
    this.ridesOffers = res['offers'];
    this.ridesAccepted =  res['done'];
    this.ridesDone = res['completed'];
  };




  changeTab(tab)
  {
    this.segmentModel = tab;
  }
}
