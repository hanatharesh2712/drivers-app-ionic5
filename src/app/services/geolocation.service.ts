import { UtilService } from '@app/services/util/util.service';


import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { DrvnAuthenticationService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location as LocationDrvn } from '@app/models/location';
import { environment } from '@env/environment';
import BackgroundGeolocation from 'cordova-background-geolocation-lt';
import { Storage } from '@ionic/storage';


@Injectable()
export class GeolocationService {
  driverPosition: Subject<LocationDrvn> = new Subject();
  location: LocationDrvn;
  driver_id: number;
  constructor(
    private http: HttpClient,
    private authService: DrvnAuthenticationService,
    private platform: Platform,
    private util: UtilService,
    private storage: Storage
  ) {
  }

  initTracking() {

    if (this.platform.is('cordova')) {
      this.initGettingPosition();
      this.driver_id = this.authService.currentUser.id;
    }
  }

  configureBackgroundGeolocation() {

    // 1.  Listen to events.
    BackgroundGeolocation.onLocation(location => {
      console.log('[location] - ', location);
      this.location = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        acu: location.coords.accuracy,
        alt: location.coords.altitude,
        speed: location.coords.speed,
        date: new Date(location.timestamp),
        provider: 'GPS',
        app_version: 'BCKP',
      };
      this.sendDriverLocation();
    });

    BackgroundGeolocation.onMotionChange(event => {
      console.log('[motionchange] - ', event.isMoving, event.location);
    });

    BackgroundGeolocation.onHttp(response => {
      console.log('[http] - ', response.success, response.status, response.responseText);
    });

    BackgroundGeolocation.onProviderChange(event => {
      console.log('[providerchange] - ', event.enabled, event.status, event.gps);
    });

    // 2.  Configure the plugin with #ready
    BackgroundGeolocation.ready({
      reset: true,
      debug: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopOnTerminate: false,
      startOnBoot: true,
      backgroundPermissionRationale: {
        title: "Allow {applicationName} to access the device's location at all times.",
        message: "This app uses location data to provide time-sensitive ride offers based on your current location, and to accurately calculate payment during your ride.",
        positiveAction: 'Allow all the time',
        negativeAction: 'Cancel'
      },
    }, (state) => {
      console.log('[ready] BackgroundGeolocation is ready to use');
      if (!state.enabled) {
        // 3.  Start tracking.
        BackgroundGeolocation.start().then(()=>{
          BackgroundGeolocation.changePace(true);
          console.log('All done!');
          this.getCurrentLocation();
        });
      } else {
        BackgroundGeolocation.changePace(true);
        console.log('All done!');
        this.getCurrentLocation();
      }
    });
  }

  initGettingPosition() {
    this.storage.get('gps-dialog').then(async (gpsDialogShowed) => {
      if (gpsDialogShowed)
      {
        this.configureBackgroundGeolocation();
      }
      else
      {
        let alert = await this.util.createAlert('Allow Location Access', false, 'drvn app collect location data to identify time-sensitive nearby demand and send new ride offers, even when the app is closed or not in use.', {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
              this.storage.set('gps-dialog', true);
              this.configureBackgroundGeolocation();
          }
        })
        alert.present();
      }})

  }

  getCurrentLocation() {
    if (this.platform.is('cordova')) {
      BackgroundGeolocation.getCurrentPosition({}, (location) => {
        console.log('- getCurrentPosition success: ', location);
      });
    }
  }

  sendDriverLocation() {
    console.log('LOCATION SENT');
    if (this.driver_id) {
      this.http
        .post<LocationDrvn>(
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
