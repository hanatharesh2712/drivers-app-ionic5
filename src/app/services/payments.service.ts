import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/internal/operators/map';
@Injectable({
  providedIn: 'root'
})

export class PaymentsService {
  payments: any[];
  total: any;

  constructor(private http: HttpClient){}


  getPayments() {
    return this.http.get<any[]>(environment.appUrl + 'getPayments').pipe(map(response =>
      {
        this.payments = response;
        this.parsePaymentsInfo();
        return this.payments;
      }));;
  }


  parsePaymentsInfo()
  {
    this.total = 0;
    this.payments.forEach(payment => {
      payment.total = 0;
      payment.bill_rides.forEach(ride => {
          payment.total += ride.calculated_farm_out_cost;
      });
      this.total += payment.total;
    });
  // this.reviews.forEach(obj => {
  //   this.score += obj.driver_rating;
  //   this.vehicleScore += obj.vehicle_rating;
  // });
  // this.score = (this.score / this.reviews.length).toFixed(1);
  // this.vehicleScore = (this.vehicleScore / this.reviews.length).toFixed(1);
  }



}
