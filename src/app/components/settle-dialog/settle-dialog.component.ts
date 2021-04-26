import { Ride } from '@app/models/ride';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { RideService } from '@app/services/ride/ride.service';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-settle-dialog',
  templateUrl: './settle-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./settle-dialog.component.scss']
})
export class SettleDialogComponent implements OnInit {

  settleForm: FormGroup;
  ride: Ride;
  constructor(
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    private rideService: RideService,
    private util: UtilService) {

  }

  ngOnInit() {
    this.settleForm = this.formBuilder.group({
      ride_id: this.ride.ride_id,
      tolls: [''],
      parking: [''],
      stops: [''],
      waiting: [''],
      misc: [''],
      notes: [''],
    })
  }

  onRateChange(rate) {
    console.log(rate);
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

  sendRating() {
    let value = this.settleForm.getRawValue();
    this.rideService.sendRating(value).then(async (response) => {
      if (response) {
        let toast = await this.util.createToast('You rating has been sent. Thank you!', true, 'bottom', 4000);
        toast.present();
        this.modalCtrl.dismiss(true)
      }
    })
  }


  formataNumero(e: any, separador: string = '.', decimais: number = 2) {
    let a:any = e.detail.value.split('');
    let ns:string = '';
    a.forEach((c:any) => { if (!isNaN(c)) ns = ns + c; });
    ns = parseInt(ns).toString();
    if (ns.length < (decimais+1)) { ns = ('0'.repeat(decimais+1) + ns); ns = ns.slice((decimais+1)*-1); }
    let ans = ns.split('');
    let r = '';
    for (let i=0; i < ans.length; i++) if (i == ans.length - decimais) r = r + separador + ans[i]; else r = r + ans[i];
    e.value = r;
  }
}
