import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ride } from '@app/models/ride';
import { RideService } from '@app/services/ride/ride.service';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'rides-list',
  templateUrl: './rides_list.component.html',
  styleUrls: ['./rides_list.component.scss']
})
export class RidesListComponent {
  @Input() rides: Ride[] = [];
  type: 'offers' | 'accepted' | 'done';
  @Input() title;
  loaded: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ridesService: RideService,
    private util: UtilService) { }

  ionViewDidEnter() {
    this.activatedRoute.data.subscribe(data => {
      this.type = data.type;
      this.ridesService.onDidRidesLoaded.subscribe((rides) =>
      {
        this.loaded = true;
        this.rides = rides[this.type];
      })

    })
  }

  viewRide(ride_id)
  {
    this.util.goForward('ride/' + ride_id);
  }

  async doRefresh(refresher) {
    const loader = await this.util.createLoader('Getting Rides details ...');
    loader.present();
    this.ridesService.getRides().subscribe(() => {
      loader.dismiss();
      if (refresher) {
        refresher.target.complete();
      }
    });
  }
}
