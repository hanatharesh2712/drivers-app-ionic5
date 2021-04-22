import { UtilService } from '@app/services/util/util.service';
import { RideService } from '@app/services/ride/ride.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DrvnAuthenticationService } from '@app/services/auth/auth.service';
import { Ride } from '@app/models/ride';

@Component({
  selector: 'page-my-rides',
  templateUrl: './my_rides.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./my_rides.component.scss']
})
export class MyRidesPageComponent implements OnInit {

  segmentModel: 'offers' | 'accepted' | 'done' = "offers";
  rides: Ride[];

  constructor(private ridesService: RideService, private authService: DrvnAuthenticationService,
    private util: UtilService) {
    this.getRides(this.authService.currentUser.id, null);
  }

  ngOnInit() {
  }

  segmentChanged(e: any) {
    this.rides = [];
    this.segmentModel = e.detail.value;
    this.getRides(this.authService.currentUser.id, null);
  }

  async getRides(driver_id, refresher) {
    const loader = await this.util.createLoader('Loading Ride History ...');
    loader.present();
    this.ridesService.getRides(driver_id).subscribe(
      res => {
        this.filterRides(res.rides);
        if (refresher != null) {
          refresher.target.complete();
        }
        loader.dismiss();
      },
      err => {
        console.log(err);
      }
    );
  }

  filterRides(res) {

    switch (this.segmentModel) {
      case 'offers':
        this.rides = res.filter(ride => ride.is_offer);
        break;
      case 'accepted':
        this.rides = res.filter(ride => !ride.is_offer && !ride.is_done);
        break;
      case 'done':
        this.rides = res.filter(ride => ride.is_done);
        break;
      default:
        break;
    }
  };

  doRefresh(refresher) {
    this.getRides(this.authService.currentUser.id, refresher);
  }
}
