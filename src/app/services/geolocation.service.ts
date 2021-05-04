import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@app/models/location';
import { environment } from '@env/environment';
import {
  Coordinates,
  Geolocation,
  GeolocationOptions,
  Geoposition,
  PositionError,
} from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { DrvnAuthenticationService } from './auth/auth.service';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationEvents,
  BackgroundGeolocationResponse,
} from '@ionic-native/background-geolocation/ngx';
@Injectable()
export class GeolocationService {
  options: GeolocationOptions;
  currentPos: Geoposition;
  driverPosition: Subject<Location> = new Subject();
  location: Location;
  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 0,
    stationaryRadius: 0,
    distanceFilter: 1,
    interval: 1000,
    fastestInterval: 1000,
    activitiesInterval: 100,
    stopOnStillActivity: false,
    startForeground: true,
    startOnBoot: true,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  };
  driver_id: number;
  constructor(
    private http: HttpClient,
    private geolocation: Geolocation,
    private authService: DrvnAuthenticationService,
    private platform: Platform,
    private backgroundGeolocation: BackgroundGeolocation
  ) {}

  initTracking() {
    if (this.platform.is('cordova')) {
      this.initGettingPosition();
      this.driver_id = this.authService.currentUser.id;
    }
  }

  initGettingPosition() {
    this.backgroundGeolocation.configure(this.config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          this.setLocation(location, location.time);
          this.geolocation
            .getCurrentPosition()
            .then((resp: Geoposition) => {
              this.setLocation(resp.coords, resp.timestamp);
            })
            .catch((error) => {
              console.log('Error getting location', error);
            });

          const watch = this.geolocation.watchPosition();
          watch.subscribe((data: Geoposition) => {
            this.setLocation(data.coords, data.timestamp);
          });
        });
    });

    this.start();
  }

  start() {
    this.backgroundGeolocation.start();
  }
  stop() {
    this.backgroundGeolocation.stop();
  }

  setLocation(data: BackgroundGeolocationResponse | Coordinates, time) {
    this.location = {
      lat: data.latitude,
      lng: data.longitude,
      acu: data.accuracy,
      alt: data.altitude,
      speed: data.speed,
      date: new Date(time),
      provider: 'GPS',
      app_version: 'TBD',
    };
    this.driverPosition.next(this.location);
    this.sendDriverLocation();
  }

  sendDriverLocation() {
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
