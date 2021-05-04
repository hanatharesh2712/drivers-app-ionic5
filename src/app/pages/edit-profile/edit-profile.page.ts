/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { UtilService } from '@app/services/util/util.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public user: any;
  constructor(
    private util: UtilService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
   // this.user = this.userProvider.getUserData();
  }

  dismiss() {
    this.navCtrl.back();
  }

  updateProfile() {
    this.navCtrl.back();
  }

  async openActionsheet() {
    const action = await this.util.createActionSheet({
      text: 'Take a Picture',
      role: 'destructive',
      cssClass: 'buttonCss',
      handler: () => {
        //this.userProvider.openCamera();
      }
    }, {
      text: 'Pick From Gallery',
      handler: () => {
      //  this.userProvider.openGallery();
      }
    }, {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'buttonCss_Cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    });

    await action.present();
  }

  async updateProfileDetails() {
    if (!this.user.name) {
      const toast = await this.util.createToast('Name cannot be empty', true, 'bottom', 2100);
      await toast.present();
    } else if (!this.user.email) {
      const toast = await this.util.createToast('Email cannot be empty', true, 'bottom', 2100);
      await toast.present();
    } else {
      const update = {
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        gender: this.user.gender,
        dob: this.user.dob,
        profile_img: this.user.profile_img,
        id: this.user.id
      };
      console.log('id', this.user.id);
     // this.api.updateDriverData(this.user.id, update).subscribe(async res => {
     //   const toast = await this.util.createToast('Profile Updated', true, 'bottom', 2100);
     //   await toast.present();
     //   this.navCtrl.back();
     // }, err => console.log(err));
    }

  }

}
