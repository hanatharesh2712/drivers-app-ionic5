import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@app/models/review';
import { environment } from '@env/environment';
import { map } from 'rxjs/internal/operators/map';
@Injectable({
  providedIn: 'root'
})

export class ReviewsService {
  reviews: Review[];
  score: any = 0;
  vehicleScore:  any = 0;

  constructor(private http: HttpClient){}


  getPaxReviews() {
    return this.http.get<Review[]>(environment.appUrl + 'getPaxReviews').pipe(map(response =>
      {
        this.reviews = response;
        this.getScores();
        return this.reviews;
      }));;
  }


  getScores()
  {
    if (this.reviews.length)
    {
      this.reviews.forEach(obj => {
        this.score += obj.driver_rating;
        this.vehicleScore += obj.vehicle_rating;
      });
      this.score = (this.score / this.reviews.length).toFixed(1);
      this.vehicleScore = (this.vehicleScore / this.reviews.length).toFixed(1);
    }
  
  }



}
