/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {
  inputText: any;
  msgList;
  constructor() {
    this.msgList = [];
  }

  ngOnInit() {
  }

  sendMsg(chipText?) {
    this.inputText = this.inputText ? this.inputText : chipText;
    this.msgList.push({
      userId: 'Me',
      userName: 'Me',
      userAvatar: 'assets/driver.jpeg',
      time: '12:01 pm',
      message: this.inputText,
    });
    this.inputText = '';
  }

}
