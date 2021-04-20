import { Component } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 1,
    distanceFilter: 0,
    interval: 1000,
    fastestInterval: 1000,
    activitiesInterval: 1000,
    stopOnStillActivity: false,
    startForeground: true,
    startOnBoot: true,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false // enable this to clear background location settings when the app terminates
  };
  constructor(private backgroundGeolocation: BackgroundGeolocation) {
    this.backgroundGeolocation.configure(this.config).then(() => {
    this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
      console.log('Locations', location);
      console.log('Speed', location.speed); // Tracks the speed of user

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      // this.backgroundGeolocation.finish(); // FOR IOS ONLY
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
}
