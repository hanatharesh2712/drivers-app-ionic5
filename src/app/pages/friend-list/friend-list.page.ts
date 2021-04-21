
/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { environment } from '@env/environment';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.page.html',
  styleUrls: ['./friend-list.page.scss'],
})
export class FriendListPage implements OnInit {
  public contactList;

  constructor(private socialSharing: SocialSharing) {
    this.contactList = environment.FRIEND_LIST;
  }

  ngOnInit() {
  }

  shareAlert() {
    this.socialSharing.share();
  }

}
