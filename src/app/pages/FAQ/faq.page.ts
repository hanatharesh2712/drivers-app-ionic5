/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit, OnChanges } from '@angular/core';
import { environment } from '@env/environment';
import { UtilService } from '@app/services/util/util.service';
import { RideService } from '@app/services/ride/ride.service';
import { Driver } from '@app/models/driver';
import { PaymentsService } from '@app/services/payments.service';
import { Subject } from 'rxjs/internal/Subject';
import { FormControl } from '@angular/forms';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FAQService } from '@app/services/faq.service';

interface FAQGroup {
  title;
  faqs: FAQ[];
}

interface FAQ {
  question;
  answer;
  expanded?;
}
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FAQPage implements OnInit, OnChanges {
  public walletData: any = [];
  public walletPage: any = 'cash';
  public loggedInuser: Driver;
  payments: any;
  total: any;
  faqs: FAQGroup[] = [];
  searchInput = new FormControl();
  private _unsubscribeAll: any;
  dataFiltered: any;
  constructor(private faqService: FAQService) {
    this.faqService.getFAQ().then((response: any) => {
      this.faqs = response.faq;
      this.dataFiltered = this.faqs;
    });
  }

  segmentChanged(ev: any) {
    //  console.log('Segment changed button clicked', ev);
  }

  async getPayments() {
    // const loader = await this.util.createLoader('Loading payments history ...');
    // await loader.present();
    // this.paymentsService.getPayments().subscribe((payments) => {
    //   console.log(payments);
    //   this.payments = payments;
    //   this.total = this.paymentsService.total;
    //   loader.dismiss();
    // });
  }

  filter(evt) {
    const searchText = evt.srcElement.value;
    this.dataFiltered = JSON.parse(JSON.stringify(this.faqs)); //THIS MAY SOUNDS REDUNDANT BUT IS FOR CREATING A COPY OF THE FAQS;
    this.dataFiltered.forEach((element: FAQGroup) => {
      element.faqs = element.faqs.filter(
        (e: FAQ) =>
          e.question.toLowerCase().includes(searchText.toLowerCase()) ||
          e.answer.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  ngOnInit() {
    this._unsubscribeAll = new Subject();

  }
  ngOnChanges() {
    console.log('change');
  }
}
