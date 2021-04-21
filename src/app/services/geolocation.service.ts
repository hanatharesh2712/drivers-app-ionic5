

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@app/models/location';
import { environment } from '@env/environment';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { AuthenticationService } from './api/firebase-authentication.service';
import { DrvnAuthenticationService } from './auth/auth.service';

@Injectable()

export class GeolocationService {

  options: GeolocationOptions;
  currentPos: Geoposition;
  driverPosition: Subject<Location> = new Subject();
  location: Location;

  constructor(
    private http: HttpClient,
    private geolocation: Geolocation,
    private authService: DrvnAuthenticationService,
    private platform: Platform
  ) { }

  initTracking() {
    if (this.platform.is('cordova')) {
      this.getDriverPosition();
      this.watchDriverPosition();
    }


  }



  getDriverPosition() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((data: Geoposition) => {
      this.setLocation(data);
      this.driverPosition.next(this.location);
    }).catch((err: PositionError) => {
      console.log('error : ' + err.message);
    });
  }

  watchDriverPosition() {
    let watch = this.geolocation.watchPosition({ enableHighAccuracy: true, timeout: 5000, maximumAge: 3000 });
    watch.subscribe((data: Geoposition) => {
      if (data.coords) {
        this.setLocation(data);
        this.driverPosition.next(this.location);
        this.sendDriverLocation();
      }

    });
  }

  setLocation(data: Geoposition) {
    this.location = {
      lat: data.coords.latitude,
      lng: data.coords.longitude,
      acu: data.coords.accuracy,
      alt: data.coords.altitude,
      speed: data.coords.speed,
      date: new Date(data.timestamp),
      provider: 'GPS',
      app_version: 'TBD',
    };
  }

  sendDriverLocation() {
    console.log('LOCATION SENT');
    let driver_id = this.authService.currentUser.id;
    this.http.post<Location>(environment.appUrl + 'setLocation' + `?driver_id=${driver_id}`, this.location).toPromise().then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log(error);
    });
  }

}
