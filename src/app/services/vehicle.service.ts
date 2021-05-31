import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@app/models/review';
import { environment } from '@env/environment';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Storage } from '@ionic/storage';
import { UtilService } from './util/util.service';
import { AbstractControl } from '@angular/forms';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class VehicleService implements Resolve<any> {
  vehicleMakeByTypes: any;

  constructor(
    private http: HttpClient) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return forkJoin(
        this.getVehiclesTypes(),
        this.getVehiclesColors(),
        this.getVehicleMakeByTypes(),
    ).pipe(map((allResponses) => {
        return {
            vehicle_types: allResponses[0],
            vehicle_colors: allResponses[1],
            vehicleMakesByType: allResponses[2],
        };
    }));
}

  getVehiclesTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.partnersAppUrl + 'partnerVehicleTypes', {
          params: new HttpParams()
            .set('pageSize', '1000')
        })
        .subscribe((response: any) => {
          resolve(response.data);
        },
          (error) => resolve(null),
          reject);
    });
  }

  getVehicleMakeByTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.vehicleMakeByTypes) {
        this.http
          .get(environment.partnersAppUrl + 'partnerVehicleMakeModels', {
            params: new HttpParams()
              .set('pageSize', '1000')
          })
          .subscribe((response: any) => {
            this.vehicleMakeByTypes = response.data;
            resolve(response.data);
          },
            (error) => resolve(null),
            reject);
      }
      else {
        resolve(this.vehicleMakeByTypes);
      }

    });
  }


  getVehiclesColors(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.partnersAppUrl + 'partnerVehicleColors', {
          params: new HttpParams()
            .set('pageSize', '1000')
        })
        .subscribe((response: any) => {
          resolve(response);
        },
          (error) => resolve(null),
          reject);
    });
  }

}
