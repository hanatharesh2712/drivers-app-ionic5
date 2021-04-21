import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@app/models/review';
import { environment } from '@env/environment';
@Injectable()

export class ReviewsService {

  constructor(private http: HttpClient){}

  getReviews(driver_id: number) {
    return this.http.get<Review[]>(environment.appUrl + 'getReviews' + `?driver_id=${driver_id}`);
  }


  getPaxReviews(driver_id: number) {
    return this.http.get<Review[]>(environment.appUrl + 'getPaxReviews' + `?driver_id=${driver_id}`);
  }



}
