import { UtilService } from '@app/services/util/util.service';

/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RidesWrapper,
  NextRideResponse,
  ChangeRideStatusResponse,
} from '@app/models/rides-wrapper.models';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { DrvnAuthenticationService } from '../auth/auth.service';
import { Ride } from '@app/models/ride';
import { GeolocationService } from '../geolocation.service';
import { NiceDateFormatPipe } from '@app/pipes/ride-date.pipe';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class RideService {
  rides = [];
  onDidRidesLoaded = new BehaviorSubject([]);
  activeRide: Ride;
  constructor(
    private http: HttpClient,
    private util: UtilService,
    private ridesService: RideService,
    private authService: DrvnAuthenticationService,
    private geolocationService: GeolocationService,
    private niceDateFormatPipe: NiceDateFormatPipe
  ) {}

  getRides() {
    this.rides = [];
    let driver_id = this.authService.currentUser.id;
    return this.http
      .get<RidesWrapper>(
        environment.appUrl + 'getRides' + `?driver_id=${driver_id}`
      )
      .pipe(
        map((response) => {
          response.rides.forEach((ride) => {

            this.parseRideResponse(ride);
          });
          const activeIndex = response.rides.findIndex(
            (e) => e.next_status_code != '' && !e.is_done && !e.is_offer
          );
          if (activeIndex != -1) {
            this.activeRide = response.rides.splice(activeIndex, 1)[0];
          }
          this.rides['offers'] = response.rides.filter((ride) => ride.is_offer);
          this.rides['accepted'] = response.rides.filter(
            (ride) => !ride.is_offer && !ride.is_done
          );
          this.rides['done'] = response.rides.filter((ride) => ride.is_done);
          this.rides['done']['open'] = response.rides.filter((ride) => ride.is_done && ride.canSettle);
          this.rides['done']['closed'] = response.rides.filter((ride) => ride.is_done && !ride.canSettle);
          this.onDidRidesLoaded.next(this.rides);
          return this.rides;
        })
      );
  }

  getRideInfo(ride_id: number) {
    return this.http
      .get<any>(environment.appUrl + 'getRide' + `?ride_id=${ride_id}`)
      .pipe(
        map((response) => {
          this.parseRideResponse(response.ride);
          return response;
        })
      );
  }

  getNextRide() {
    return this.http
      .get<NextRideResponse>(environment.appUrl + 'getNextRide')
      .pipe(
        map((response) => {
          this.parseRideResponse(response.ride);
          return response;
        })
      );
  }

  acceptRide(ride) {
    let title = '';
    let text = '';
    if (ride.child_seats) {
      title = 'You accept Ride for: ';
      text = ride.nice_spot_datetime + ' (Spot Time) <br>';
      if (ride.child_seats.length)
      {
        text += '<br><b>This ride requires:</b> <br>';
        ride.child_seats.forEach((cseat) => {
          text += cseat.count + ' x ' + cseat.type + '<br>';
        });
      }
      if (ride.handicap)
      {
        text += "Handicap"
      }
    }
    return new Promise(async (resolve, reject) => {
      let alert = await this.util.createAlert(
        title,
        false,
        text,
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'YES, I ACCEPT',
          handler: () => {
            this.sendChangeStatus(
              ride.next_status_code,
              ride.ride_id
            ).subscribe(async (response) => {
              this.parseRideResponse(response.ride);
              const toast = await this.util.createToast(
                'Your ride offer was accepted. Thank you!',
                false,
                'bottom',
                4000
              );
              toast.present();
              resolve(response.ride);
            });
          },
        }
      );
      alert.present();
    });
  }

  rejectRide(ride) {
    return new Promise(async (resolve, reject) => {
      let alert = await this.util.createAlert(
        'Reject this Ride',
        false,
        'Please confirm you want to reject this ride',
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirm',
          handler: () => {
            this.ridesService
              .sendChangeStatus('RJCT', ride.ride_id)
              .subscribe(async (response) => {
                this.parseRideResponse(response.ride);
                const toast = await this.util.createToast(
                  'Your ride offer was rejected. Thank you!',
                  false,
                  'bottom',
                  4000
                );
                toast.present();
                resolve(response.ride);
              });
          },
        }
      );
      alert.present();
    });
  }

  async setStop(ride_id) {
    return this.http
      .post(environment.appUrl + 'setStop', {
        ride_id,
        ...this.geolocationService.location
      })
      .pipe(
        map(async (response) => {
          const toast = await this.util.createToast(
            'Additional stop has been added.',
            false,
            'bottom',
            4000
          );
          toast.present();
          return response;
        })
      )
      .toPromise();
  }

  sendRating(data) {
    return this.http
      .post(environment.appUrl + 'setRideRating', data)
      .pipe(
        map((response) => {
          return response;
        })
      )
      .toPromise();
  }

  sendSettle(data) {
    return this.http
      .post(environment.appUrl + 'setRideSettle', data)
      .pipe(
        map((response) => {
          return response;
        })
      )
      .toPromise()
      .then(async (response) => {
        const toast = await this.util.createToast(
          'You settle has been sent. Thank you!',
          true,
          'bottom',
          4000
        );
        toast.present();
        return response;
      });
  }

  changeStatus(ride, waiting_seconds = null) {
    return new Promise(async (resolve, reject) => {
      let alert = await this.util.createAlert(
        'Confirm',
        false,
        ride.next_status_alert,
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.sendChangeStatus(
              ride.next_status_code,
              ride.ride_id,
              waiting_seconds
            ).subscribe(
              async (response) => {
                const toast = await this.util.createToast(
                  'Ride status has been changed.',
                  false,
                  'middle',
                  3000
                );
                toast.present();
                if (ride.next_status_code == 'DON') {
                  resolve(null);
                }
                this.parseRideResponse(response.ride);
                resolve(response.ride);
              },
              (error) => {
                reject(error);
              }
            );
          },
        }
      );
      alert.present();
    });
  }

  sendChangeStatus(next_status_code, ride_id, waiting_seconds= null) {
    return this.http
      .post<ChangeRideStatusResponse>(environment.appUrl + 'setRideStatus', {
        next_status_code,
        ride_id,
        waiting_seconds,
        ...this.geolocationService.location
      })
      .pipe(
        map((response) => {
          this.parseRideResponse(response.ride);
          return response;
        })
      );
  }

  parseRideResponse(ride: Ride) {
    if (!ride) {
      return;
    }
    ride.routing = ride.routing;
    ride.pickUp = ride.routing.find((e) => e.RIType == 'PU');
    ride.dropOff = ride.routing.find((e) => e.RIType == 'DO');
    ride.waitsAndStops = ride.routing.filter(
      (e) => e.RIType == 'WT' || e.RIType == 'ST'
    );
    ride.pu_datetime = ride.pu_date + ' ' + ride.pu_time;
    ride.nice_pu_datetime = this.niceDateFormatPipe.transform(ride.pu_datetime);
    if (parseInt(ride.pu_time.replace(/:/g, '')) > parseInt(ride.spot_time.replace(/:/g, '')))
    {
      ride.spot_datetime = ride.pu_date + ' ' + ride.spot_time;
    }
    else
    {
      let date = moment(ride.pu_datetime).add('1', 'days');
      ride.spot_datetime = (date.month) + '/' + date.day + '/' + date.year + ' ' + ride.spot_time;
    }
    ride.nice_spot_datetime = this.niceDateFormatPipe.transform(ride.spot_datetime);
    this.checkIfCanSettle(ride);

  }

  checkIfCanSettle(ride)
  {

    if (ride.is_done) {
      const endDate = ride.times.find(e => e.type_id == 1);
      if (endDate)
      {
        const hoursSinceDropoff = moment.duration((moment(endDate.time).diff(moment()))).asHours();
        if (hoursSinceDropoff
        <
         ride.settle_deadline
        ) {
          ride.canSettle = true;
        //  ride.settleRemainingHours = this.ride.settle_deadline - hoursSinceDropoff;
        }
      }

    }
  }
}
