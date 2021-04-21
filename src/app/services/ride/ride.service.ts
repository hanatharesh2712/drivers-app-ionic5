
/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Injectable, NgZone } from '@angular/core';
import { UtilService } from '@app/services/util/util.service';
import { environment } from '@env/environment';
import { User } from '@app/models/user';
import { Ride } from '@app/models/ride';
import { APIService } from '../api/api.service';
import { Storage } from '@ionic/storage';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  zoom = 14;
  userCard: boolean;
  mapStyle = environment.MAP_STYLE;
  mapData = {
    lat: environment.DEFAULT_LAT,
    lng: environment.DEFAULT_LNG,
    origin: null,
    destination: null,
    originAddress: null,
    destinationAddress: null,
    driverLocation: null
  }
  rideUser: User;
  rideInfo: Ride;
  rideStage = {
    rideAccepted: false,
    rideStarted: false,
    startedPickupNavigation: false
  }
  stats = {
    hoursOnline: 0,
    totalDistance: 0,
    totalRides: 0,
    totalFare: 0
  };
  markerUrl = 'assets/markerPin.png';
  listenerId;
  loggedInUser;
  rideAlert;
  ridelistenerId;
  constructor(
    public util: UtilService,
    public api: APIService,
    private __zone: NgZone,
    private storage: Storage,
    private userProvider: InitUserProvider,
    private geolocation: Geolocation,

  ) {
    this.rideInfo = {
      id: null,
      origin_lat: null,
      origin_lng: null,
      destination_lat: null,
      destination_lng: null,
      distance: null,
      fare: null,
      clientId: null,
      driverId: null,
      driver_rejected: false,
      ride_started: false,
      ride_accepted: false,
      user_rejected: false,
      ride_completed: false,
      taxi_type: ''
    };
    this.userCard = false;
    this.loggedInUser = this.userProvider.getUserData();
  }

  async setAddress(location, locationType) {
    const address = await this.util.getGeoCodedAddress(location.lat, location.lng);
    if (locationType === 'pickup') {
      this.mapData.origin = location;
      this.mapData.originAddress = `${address.block} ${address.street} ${address.building}`;
      return this.mapData.originAddress;
    }
    if (locationType === 'destination') {
      this.mapData.destination = location;
      this.mapData.destinationAddress = `${address.block} ${address.street} ${address.building}`;
      return this.mapData.destinationAddress;
    }

  }

  async setRideInfo(ride) {
    Object.assign(this.rideInfo, ride);
    this.setRideStatusListener();
    await this.setAddress({ lat: ride.origin_lat, lng: ride.origin_lng }, 'pickup');
    await this.setAddress({ lat: ride.destination_lat, lng: ride.destination_lng }, 'destination');
    this.rideStage.rideAccepted = true;
    this.api.getRideUser(ride.clientId).subscribe(
      user => {
        this.rideUser = user;
      },
      err => console.log(err)
    );
    this.setRideId(ride.id);
  }

  setIncomingRideListener() {
    console.log('set listener');
    this.listenerId = setInterval(() => {
      console.log('ride check......');
      this.incomingRidesCheck();
    }, 7000);
  }

  clearIncomingRideListener() {
    clearInterval(this.listenerId);
    this.listenerId = null;
  }

  incomingRidesCheck() {
    if (!this.rideStage.rideAccepted && this.loggedInUser.available) {
      this.api.rideCheck().subscribe(ride => {
        console.log(ride);
        if (ride) {
          this.clearIncomingRideListener();
          this.showRidePopup(ride);
        } else {
          console.log('No New Rides Booked');
        }
      });
    }
  }

  async showRidePopup(ride) {

    console.log(ride);
    const address = await this.setAddress({ lat: ride.origin_lat, lng: ride.origin_lng }, 'pickup');

    this.rideAlert = await this.util.createAlert(
      'Alert!',
      false,
      `New Ride at :${address}`,
      {
        text: 'Reject',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async res => {
          this.setIncomingRideListener();
        }
      },
      {
        text: 'Accept',
        handler: async () => {
          // accept ride  function
          const loader = await this.util.createLoader('Please wait...');
          await loader.present();
          this.api.acceptRide(ride.id, this.loggedInUser.id)
            .subscribe(res => {
              loader.dismiss();
              this.rideAlert = null;
              if (res.message[0]) {
                this.setRideInfo(ride);
              } else {
                this.clearRideInfo();
              }

            });
        }
      }
    );

    await this.rideAlert.present();
  }

  async completeRide() {
    const loader = await this.util.createLoader('Completing your ride ...');
    await loader.present();

    this.api.completeRide(this.rideInfo.id)
      .subscribe(res => {
        console.log('rideCompleted');
        this.clearRideInfo();
        loader.dismiss();

      }, err => console.log(err));
  }

  async startRide() {
    const loader = await this.util.createLoader('Starting ride ...');
    await loader.present();

    this.api.startRide(this.rideInfo.id)
      .subscribe(res => {
        console.log('rideStarted', res);
        if (res.message[0]) {  // response of accpetance
          this.rideStage.rideStarted = true;
          this.startRideNavigation();
        } else {
          this.clearRideInfo();
        }
        loader.dismiss();

      }, err => console.log(err));
  }

  startNavigationToPickup() {
    this.rideStage.startedPickupNavigation = true;
    this.util.startNavigationToPickup(this.mapData.driverLocation, this.mapData.origin);
  }

  startRideNavigation() {
    this.util.startNavigationToPickup(this.mapData.origin, this.mapData.destination);
  }

  getRideStats() {
    this.api.getTodayRideStats(this.loggedInUser.id).subscribe(
      stats => {
        Object.assign(this.stats, stats);
      },
      err => console.log(err)
    );
  }


  setRideStatusListener() {
    this.ridelistenerId = setInterval(() => {
      this.checkRideStatus();
    }, 7000);
  }

  clearRideStatusListener() {
    clearInterval(this.ridelistenerId);
    this.ridelistenerId = null;
  }

  async checkRideStatus() {
    console.log('ride status check.....');
    const rideId = this.rideInfo.id;
    this.api.getRide(rideId).subscribe((ride: Ride) => {
      if (this.rideAlert && (ride['user_rejected'] || ride['request_timeout'])) {
        console.log('CONDITION1');
        this.clearRideInfo();
      } else if (ride['user_rejected']) {
        console.log('CONDITION2');
        this.showUserRejectedAlert();
      } else {
        console.log('waiting for response from user');
      }
    });
  }

  async showUserRejectedAlert() {

    const cancelAlert = await this.util.createAlert(
      'Sorry!',
      false,
      environment.USER_REJECTED_MSG,
      {
        text: 'Ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async () => {
          this.clearRideInfo();
        }
      }
    );
    await cancelAlert.present();
  }

  async showDriverCanceledRideAlert() {

    const cancelAlert = await this.util.createAlert(
      'Cancel Ride ?',
      false,
      environment.DRIVER_CANCEL_MSG,
      {
        text: 'Ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async () => {
          this.api.cancelRide(this.rideInfo.id).subscribe(res => {
            this.clearRideInfo();
          }, err => console.log(err));

        }
      }
    );
    await cancelAlert.present();

  }

  load() {
    console.log('LOAD');
    this.mapData.lat = this.loggedInUser.location_lat || environment.DEFAULT_LAT;
    this.mapData.lng = this.loggedInUser.location_lng || environment.DEFAULT_LNG;
    this.getcurrentLocations();
    this.getRideStats();
    if (this.loggedInUser.available) {
      this.setIncomingRideListener();
    }
  }

  getcurrentLocations() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.mapData.lat = resp.coords.latitude;
        this.mapData.lng = resp.coords.longitude;
        const obj = {};
        obj['location_lat'] = resp.coords.latitude;
        obj['location_lng'] = resp.coords.longitude;
        this.mapData.driverLocation = { lat: resp.coords.latitude, lng: resp.coords.longitude };
        obj['id'] = this.loggedInUser.id;
        // update driver's corodinate in the database
        this.api.updateDriverData(this.loggedInUser.id, obj)
          .subscribe(
            res => console.log(res),
            err => console.log(err)
          );
      })
      .catch(error => {
        console.log('Error getting location', error);
      });
  }

  async clearRideInfo() {
    this.rideStage.rideAccepted = false;
    this.rideStage.rideStarted = false;
    this.rideStage.startedPickupNavigation = false;
    await this.clearRideId();
    if (this.rideAlert) { this.rideAlert.dismiss(); }
    this.rideAlert = null;
    this.load();
    this.clearRideStatusListener();
  }

  async getRideId() {
    const rideId = await this.storage.get('rideId');
    return rideId;
  }


  async setRideId(rideId) {
    console.log('ride Id set', rideId);
    await this.storage.set('rideId', rideId);
  }

  async clearRideId() {
    await this.storage.remove('rideId');
  }

  checkIfExistingRide(rideId) {
    this.api.getRide(rideId).subscribe(async ride => {
      if (ride && !ride['ride_completed'] && !ride['driver_rejected'] && !ride['user_rejected'] && !ride['request_timeout']) {
        this.setRideInfo(ride);
      } else {
        console.log('clear', rideId);
        await this.clearRideId();
        this.load();
      }
    }, err => console.log(err));
  }
}
