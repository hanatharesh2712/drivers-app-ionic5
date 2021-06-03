import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@app/models/location';
import { environment } from '@env/environment';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { DrvnAuthenticationService } from './auth/auth.service';
@Injectable()
export class GeolocationService {
  driverPosition: Subject<Location> = new Subject();
  location: Location;
  driver_id: number;
  public started: boolean;
  constructor(
    private http: HttpClient,
    private authService: DrvnAuthenticationService,
    private platform: Platform
  ) {

  }

  initTracking() {
    if (this.platform.is('cordova')) {
      //this.initGettingPosition();
    }
  }

  sendDriverLocation() {
    if (this.driver_id) {
      console.log('LOCATION SENT');
      this.http
        .post<Location>(
          environment.appUrl + 'setLocation' + `?driver_id=${this.driver_id}`,
          this.location
        )
        .toPromise()
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
