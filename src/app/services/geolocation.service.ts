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
  driver_id: number;
  public started: boolean;
  constructor(
    private http: HttpClient,
    private geolocation: Geolocation,
    private authService: DrvnAuthenticationService,
    private platform: Platform,
    private backgroundGeolocation: BackgroundGeolocation
  ) {

  this.backgroundGeolocation
    .on(BackgroundGeolocationEvents.authorization)
    .subscribe((status: any) => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status
      );
      if (status !== 1) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(function () {
          const showSettings = confirm(
            'App requires location tracking permission. Would you like to open app settings?'
          );
          if (showSettings) {
            this.backgroundGeolocation.showAppSettings();
          }
        }, 1000);
      } else {
      //  this.initFrontGeoposition();
      }
    });
  }

  initTracking() {
    if (this.platform.is('cordova')) {
      this.initGettingPosition();
      this.driver_id = this.authService.currentUser.id;
    }
  }

  initGettingPosition() {
    this.backgroundGeolocation
      .configure({
        desiredAccuracy: 10,
        stationaryRadius: 0,
        distanceFilter: 0,
        interval: 500,
        notificationTitle: 'drvn chauffeur app',
        notificationText: 'Ready to receive new rides',
        startForeground: true,
        notificationsEnabled: true,
        startOnBoot: true,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: true, // enable this to clear background location settings when the app terminates
      })
      .then(() => {
        this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          //  this.backgroundGeolocation.startTask().then(() =>
          //  {
          //    this.setLocation(location, location.time, 'BCK');
          //    this.backgroundGeolocation.endTask();
          //  });s
          this.setLocation(location, location.time, 'BCK');
        });
      });
    this.start();
    this.initFrontGeoposition();
    this.started = true;
  }

  start() {
    this.backgroundGeolocation.start();
  }
  stop() {
    this.backgroundGeolocation.stop();
  }

  async initFrontGeoposition() {
    const loc: any = await this.getCurrentLocation();
    this.setLocation(loc.coords, loc.timestamp, 'TBD');
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data: Geoposition) => {
      this.setLocation(data.coords, data.timestamp, 'TBD');
    });
  }


  getCurrentLocation()
  {
    return new Promise((resolve, reject) =>
    {
      this.geolocation.getCurrentPosition()
      .then((resp: Geoposition) => {
        resolve(resp);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
    })
  }

  setLocation(data: BackgroundGeolocationResponse | Coordinates, time, type) {
    if (data && (
      !this.location ||
      data.longitude != this.location.lng ||
      data.latitude != this.location.lng)
    ) {
      this.location = {
        lat: data.latitude,
        lng: data.longitude,
        acu: data.accuracy,
        alt: data.altitude,
        speed: data.speed,
        date: new Date(time),
        provider: 'GPS',
        app_version: type,
      };
      this.driverPosition.next(this.location);
      this.sendDriverLocation();
    }
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
