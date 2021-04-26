
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
import { RidesWrapper, NextRideResponse, ChangeRideStatusResponse } from '@app/models/rides-wrapper.models';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RideService {
  constructor(private http: HttpClient, private util: UtilService, private ridesService: RideService) { }

  getRides(driver_id: number) {
    return this.http.get<RidesWrapper>(environment.appUrl + 'getRides' + `?driver_id=${driver_id}`);
  }

  getNextRide() {
    return this.http.get<NextRideResponse>(environment.appUrl + 'getNextRide').pipe(map(response => {
      this.parseRideResponse(response);
      return response;
    }));
  }



  acceptRide(ride) {
    let title = '';
    let text = '';
    if (ride.child_seats) {
      title = 'Child Seat Required!'
      text = "This ride requires <br>";
      ride.child_seats.forEach(cseat => {
        text += cseat.count + ' x ' + cseat.type + '<br>';
      });
      text += `<b>${ride.next_status_alert}</b>`;
    }
    return new Promise(async (resolve, reject) => {
      let alert = await this.util.createAlert(title, false, text, {
        text: 'CANCEL',
        role: 'cancel',
        handler: () => {

        }
      }, {
        text: 'YES, I ACCEPT',
        handler: () => {
          this.ridesService.sendChangeStatus(ride.next_status_code, ride.ride_id).subscribe(response => {

            resolve(response.ride);

          })
        }
      });
      alert.present();
    })

  }

  rejectRide(ride) {

    return new Promise(async (resolve, reject) => {
      let alert = await this.util.createAlert('Reject this Ride', false, 'Please confirm you want to reject this ride', {
        text: 'CANCEL',
        role: 'cancel',
        handler: () => {

        }
      }, {
        text: 'Confirm',
        handler: () => {
          this.ridesService.sendChangeStatus('RJCT', ride.ride_id).subscribe(response => {
            resolve(response.ride);

          })
        }
      });
      alert.present();
    })

  }


  sendRating(data) {
    return this.http.post(environment.appUrl + 'setRideRating',
      data).pipe(map(response => {
        return response;
      })).toPromise();
  }




  changeStatus(ride) {
    return new Promise(async (resolve, reject) => {
      let alert = await this.util.createAlert('Confirm', false, ride.next_status_alert, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {

        }
      }, {
        text: 'Confirm',
        role: 'confirm',
        handler: () => {
          this.sendChangeStatus(ride.next_status_code, ride.ride_id).subscribe(async (response) => {
            const toast = await this.util.createToast('Ride status has been changed successfully.', false, 'top', 2000)
            toast.present();
            if (ride.next_status_code == 'DON') {
              resolve(null);
            }
            resolve(response.ride);

          }, error =>
          {
            reject(error)
          })
        }
      });
      alert.present();
    })

  }

  sendChangeStatus(next_status_code, ride_id) {
    return this.http.post<ChangeRideStatusResponse>(environment.appUrl + 'setRideStatus',
      {
        next_status_code, ride_id
      }).pipe(map(response => {
        this.parseRideResponse(response);
        return response;
      }));
  }

  parseRideResponse(response) {
    if (!response.ride) {
      return;
    }
    response.ride.routing = response.routing;
    response.ride.pickUp = response.routing.find(e => e.RIType == 'PU');
    response.ride.dropOff = response.routing.find(e => e.RIType == 'DO');
  }
}
