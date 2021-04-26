import { UtilService } from '@app/services/util/util.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ride } from '@app/models/ride';
import { RideService } from '@app/services/ride/ride.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent implements OnInit {

  ratingForm: FormGroup;
  ride: Ride;
  constructor(
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    private rideService: RideService,
    private util: UtilService) {

  }

  ngOnInit() {
    this.ratingForm = this.formBuilder.group({
      ride_id: this.ride.ride_id,
      comments: [''],
      rating: ['', Validators.required]
    })
  }

  onRateChange(rate) {
    console.log(rate);
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

  sendRating() {
    let value = this.ratingForm.getRawValue();
    this.rideService.sendRating(value).then(async (response) => {
      if (response) {
        let toast = await this.util.createToast('You rating has been sent. Thank you!', true, 'bottom', 4000);
        toast.present();
        this.modalCtrl.dismiss(true)
      }
    })
  }
}
