import { ReviewsService } from './../../services/reviews.service';
import { UtilService } from '@app/services/util/util.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { DrvnAuthenticationService } from '@app/services/auth/auth.service';
import { Review } from '@app/models/review';

@Component({
  selector: 'page-my-reviews',
  templateUrl: './my_reviews.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./my_reviews.component.scss']
})
export class MyReviewsPage {

  reviews: any[] = [];
  error: any;
  score: any = 0;
  paxReviewsTotal: number = 0;
  vehicleScore: any = 0;

  constructor(private reviewsService: ReviewsService, private authService: DrvnAuthenticationService,
    private util: UtilService) {

  }

  ionViewDidEnter() {
    this.getReviews(this.authService.currentUser.id);
  }

  async getReviews(driver_id, refresher = null) {
    let promise;
    this.reviews = [];
    const loader = await this.util.createLoader('Loading Reviews...');
    loader.present();
    promise = this.reviewsService.getPaxReviews(driver_id);
    promise.subscribe(
      res => {
        this.reviews = res.map(review => {
          return new Review(review);
        });
        this.getScore();
        this.paxReviewsTotal = this.reviews.length;
        if (refresher) {
          refresher.target.complete();
        }
        loader.dismiss();
      },
      err => {
        this.error = err;
      }
    );
  }

  getScore() {
    this.reviews.forEach(obj => {
      this.score += obj.driver_rating;
      this.vehicleScore += obj.vehicle_rating;
    });
    this.score = (this.score / this.reviews.length).toFixed(1);
    this.vehicleScore = (this.vehicleScore / this.reviews.length).toFixed(1);
  }

  doRefresh(refresher) {
    this.getReviews(this.authService.currentUser.id, refresher);
  }
}
