
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
  constructor(private http: HttpClient){}

  getRides(driver_id: number) {
    return this.http.get<RidesWrapper>(environment.appUrl + 'getRides' + `?driver_id=${driver_id}`);
  }

  getNextRide()
  {
    return this.http.get<NextRideResponse>(environment.appUrl + 'getNextRide').pipe(map(response =>
      {
        this.parseRideResponse(response);
        return response;
      }));
  }


  changeStatus(next_status_code, ride_id)
  {
    return this.http.post<ChangeRideStatusResponse>(environment.appUrl + 'setRideStatus',
    {
      next_status_code, ride_id
    }).pipe(map(response =>
      {
        this.parseRideResponse(response);
        return response;
      }));
  }

  parseRideResponse(response)
  {
    if (!response.ride)
    {
      return;
    }
    response.ride.routing = response.routing;
    response.ride.pickUp = response.routing.find(e => e.RIType == 'PU');
    response.ride.dropOff = response.routing.find(e => e.RIType == 'DO');
  }
}
