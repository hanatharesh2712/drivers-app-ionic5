import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-ride-map-dialog',
  templateUrl: './ride-map-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./ride-map-dialog.component.scss']
})
export class RideMapDialogComponent implements OnInit {

  ride;
  constructor(private navParams: NavParams,
    private modalCtrl: ModalController) {
    console.log(this.ride);
   }

  ngOnInit() {
  }
  dismiss() {
    this.modalCtrl.dismiss(false);
  }

}
