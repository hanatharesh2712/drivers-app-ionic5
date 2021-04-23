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

  segmentModel: 'pax-reviews' | 'my-reviews' = 'pax-reviews';
  reviews: any[] = [];
  error: any;
  score: number;
  paxReviewsTotal: number;

  constructor(private reviewsService: ReviewsService, private authService: DrvnAuthenticationService,
    private util: UtilService) {

  }

  ionViewDidEnter() {
    this.getReviews(this.authService.currentUser.id);
  }

  segmentChanged(e: any) {
    this.segmentModel = e.detail.value;
    this.getReviews(this.authService.currentUser.id);
  }

  async getReviews(driver_id, refresher = null) {
    let promise;
    this.reviews = [];
    const loader = await this.util.createLoader('Loading Reviews...');
    loader.present();
    if (this.segmentModel == 'pax-reviews') {
      promise = this.reviewsService.getReviews(driver_id);
    }
    else if (this.segmentModel == 'my-reviews') {
      promise = this.reviewsService.getPaxReviews(driver_id);
    }
    promise.subscribe(
      res => {
        this.reviews = res.map(review => {
          return new Review(review);
        });
        if (this.segmentModel == 'pax-reviews') {
             this.getScore();
             this.paxReviewsTotal = this.reviews.length;
        }
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
    this.score = 0;
    this.reviews.forEach(obj => {
      this.score += obj.rating;
    });
    this.score = Math.round((this.score + Number.EPSILON) * 1) / 1
    this.score = this.score / this.reviews.length;
  }

  doRefresh(refresher) {
    this.getReviews(this.authService.currentUser.id, refresher);
  }
}
