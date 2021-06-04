import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RatingDialogComponent } from '@app/components/rating-dialog/rating-dialog.component';
import { RideMapDialogComponent } from '@app/components/ride-map-dialog/ride-map-dialog.component';
import { RideMapComponent } from '@app/components/ride-map/ride-map.component';
import { RidePricingPopoverComponent } from '@app/components/ride-pricing-popover/ride-pricing-popover.component';
import { SettleDialogComponent } from '@app/components/settle-dialog/settle-dialog.component';
import { Ride } from '@app/models/ride';
import { RideService } from '@app/services/ride/ride.service';
import { UtilService } from '@app/services/util/util.service';
import { environment } from '@env/environment';
import { NavParams, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Moment } from 'moment';
import { GreetingSignPage } from '../greeting-sign/greeting-sign.page';

@Component({
  selector: 'ride-detail',
  templateUrl: './ride-detail.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./ride-detail.page.scss'],
})
export class RideDetailPage implements OnInit, OnDestroy {
  ride: Ride;
  ride_id: any;
  settlingRide: boolean;
  showingPricing = false;
  settleForm: FormGroup;
  isRideActive = false;
  canSettle: boolean = false;
  showingMap = false;
  isMapLoaded = false;
  loading: boolean;
  showTimeCounter: boolean;
  gracePeriodMins = 1;
  timeOnLocationSet: Date | Moment;
  minutesSinceOnLocation: string;
  secondsSinceOnLocation: string;
  isOnGracePeriod: boolean;
  gracePeriodPercentage: any;
  wtInterval: any;
  waitStartedDate: any;
  storageInfo: any = {};
  isDone: boolean;
  canGiveBackRide = false;
  settleRemainingHours: number;
  isRideAccepted: boolean;

  @ViewChild(RideMapComponent, { static: false }) rideMap: RideMapComponent;
  @ViewChild('tollsInput', { static: false }) tollsInput;


  constructor(
    private rideService: RideService,
    private util: UtilService,
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.ride_id = params['ride_id'];
      if (this.ride_id) {
        this.getRideInfo();
      } else {
        this.util.goBack('rides');
      }
    });
  }

  initRide(ride) {
    this.ride = ride;
    this.initStorageData();
    if (
      !this.ride.is_offer &&
      !this.ride.is_done
    ) {
      if (this.ride.next_status_code) {
        this.isRideActive = true;
      }
      else {
        this.isRideAccepted = true;
      }

      this.initWaitingTime();
    } else {
      this.calculateCanGiveBackRide();
      //   this.checkIfCanSettle();
    }
    this.createSettleForm();
  }



  initStorageData() {
    this.storage.get('ride-' + this.ride_id).then((alreadyStorageInfo) => {
      if (!alreadyStorageInfo) {
        this.storage.set('ride-' + this.ride_id, {}).then((newStorageInfo) => {
          this.storageInfo = newStorageInfo;
        });
      } else {
        this.storageInfo = alreadyStorageInfo;
        this.updateStorage();
      }
    });
  }

  updateStorage() {
    this.storage
      .set('ride-' + this.ride_id, this.storageInfo)
      .then((newValue) => {
        this.storageInfo = newValue;
      });
  }

  calculateCanGiveBackRide() {
    if (this.isRideAccepted) {
      if (

        moment(this.ride.pu_datetime).diff(moment(), 'hours') >
        environment.giveBackHoursLimit
      ) {
        this.canGiveBackRide = true;
      }
    }
  }


  createSettleForm() {
    this.settleForm = this.fb.group({
      ride_id: this.ride_id,
      waiting: 0,
      stops_description: [
        '',
        this.ride.costs.reported_stops > 0 ? [Validators.required] : null,
      ],
      tolls: '',
      parking: '',
    });
  }

  async getRideInfo(refresher = null) {
    this.loading = true;
    this.rideService.getRideInfo(this.ride_id).subscribe((response: any) => {
      if (response.ride) {
        this.initRide(response.ride);
        if (refresher) {
          refresher.target.complete();
        }
      } else {
        this.util.goBack('rides');
      }
      this.loading = false;
    });
  }
  acceptRide() {
    this.rideService.acceptRide(this.ride).then((response) => {
      if (response) {
        this.initRide(response);
      }
    });
  }

  openSettle() {
    this.settlingRide = true;
    setTimeout(() => {
      this.tollsInput.setFocus();
    }, 500);
  }

  rejectRide() {
    this.rideService.rejectRide(this.ride).then((response) => {
      if (response) {
        this.util.goBack('rides');
      }
    });
  }

  async doRefresh(refresher) {
    this.getRideInfo(refresher);
  }

  closeFooters() {
    this.settlingRide = false;
    this.showingPricing = false;
    this.showingMap = false;
  }

  async openPricingPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: RidePricingPopoverComponent,
      cssClass: 'pricing-details-popover',
      componentProps: {
        costs: this.ride.costs,
      },
      event: ev,
      translucent: false,
    });
    await popover.present();
  }

  setSettle() {
    const value = this.settleForm.getRawValue();
    this.rideService.sendSettle(value).then((response) => {
      if (response) {
        this.canSettle = false;
      }
    });
  }

  async changeStatus() {
    let secondsOnWaiting = null;
    if (this.ride.next_status_code == 'POB') {
      secondsOnWaiting = this.stopWaitingTime();
    }
    this.rideService
      .changeStatus(this.ride, secondsOnWaiting)
      .then((response: Ride) => {
        if (response) {
          this.initRide(response);
        } else {
          this.ride.is_done = true;
          this.openRating();

        }
      });
  }

  async openRoutingMap(event) {
    event.stopPropagation();
    if (this.isRideActive) {
      this.showingMap = true;
    } else {
      const dialog = await this.util.createModal(
        RideMapDialogComponent,
        { ride: this.ride },
        'ride-map-dialog'
      );
      dialog.present();
    }
  }

  expandMap(event) {
    event.stopPropagation();
    this.showingMap = !this.showingMap;
  }

  goToContact() {
    this.util.goForward('/contact');
  }

  sendSMS() {
    this.util.sendSms(this.ride.passenger_number);
  }

  callPassenger() {
    this.util.call(this.ride.passenger_number);
  }

  initWaitingTime() {

    if (
      this.ride.next_status_code == 'POB' &&
      this.ride.service_type.toUpperCase() != 'HOURLY'
    ) {
      this.showTimeCounter = true;
      this.timeOnLocationSet = moment(
        this.ride.times.find((e) => e.type_id == 3).time
      );
      this.wtInterval = setInterval(() => {
        this.calculateTimerValue();
      }, 1000);
    } else {
      if (this.ride.next_status_code == 'DOC') {
        this.storageInfo.waitStartedDate = null;
        this.updateStorage();
      }
      this.showTimeCounter = false;
    }
  }

  stopWaitingTime() {
    const now = moment();
    this.storageInfo.waitEndDate = now.valueOf();
    this.updateStorage();
    return Math.abs(
      (this.storageInfo.waitEndDate - moment(this.storageInfo.waitStartedDate).valueOf()) /
      1000
    );
  }

  calculateTimerValue() {
    if (this.timeOnLocationSet) {

      let secondsRemainingGracePeriod = moment(this.timeOnLocationSet).add(this.gracePeriodMins, 'minutes').diff(moment(), 'seconds');
      if (secondsRemainingGracePeriod < 0) {
        this.isOnGracePeriod = false;
          this.calculateWaitTimeDuration();
      } else {
        this.calculateGracePeriodDuration(secondsRemainingGracePeriod);
      }
    }
  }

  calculateWaitTimeDuration()
  {
    if (this.storageInfo.waitStartedDate) {
      let secondsSinceWaitTimeStarted = moment().diff(moment(this.storageInfo.waitStartedDate), 'seconds')
      this.minutesSinceOnLocation = this.pad(
        Math.trunc(secondsSinceWaitTimeStarted / 60),
        2
      );
      this.secondsSinceOnLocation = this.pad(
        Math.trunc(secondsSinceWaitTimeStarted % 60),
        2
      );
    }
  }

  calculateGracePeriodDuration(secondsRemainingGracePeriod)
  {
    this.isOnGracePeriod = true;
    this.gracePeriodPercentage = (
      ((((this.gracePeriodMins - secondsRemainingGracePeriod / 60) * 100) /
        this.gracePeriodMins) *
        175) /
      100
    ).toFixed(2);
    secondsRemainingGracePeriod = Math.abs(secondsRemainingGracePeriod);
    this.minutesSinceOnLocation = this.pad(Math.trunc(secondsRemainingGracePeriod / 60), 2);
    this.secondsSinceOnLocation = this.pad(Math.trunc(secondsRemainingGracePeriod % 60), 2);
  }

  startWTTime() {
    this.storageInfo.waitStartedDate = moment().valueOf();
    this.updateStorage();
  }
  pad(num, size) {
    num = num.toString();
    while (num.length < size) num = '0' + num;
    return num;
  }

  async requestConfirmStop() {
    if (this.storageInfo.requestedStop) {
      const alert = await this.util.createAlert(
        'CONFIRM STOP LOCATION',
        false,
        'Are you on the stop location?',
        {
          text: 'Not yet',
          handler: () => { },
        },
        {
          text: 'Yes, confirm',
          handler: () => {
            this.rideService.setStop(this.ride_id).then((response) => {
              this.storageInfo.confirmedStop = true;
              this.updateStorage();
            });
          },
        }
      );
      alert.present();
    } else {
      const alert = await this.util.createAlert(
        'STOP REQUESTED',
        false,
        'Now, please confirm when you arrive to the stop location',
        {
          text: 'Confirm',
          handler: () => {
            this.storageInfo.requestedStop = true;
            this.updateStorage();
          },
        }
      );
      alert.present();
    }
  }

  async confirmStop() { }

  async openRating() {
    const dialog = await this.util.createModal(
      RatingDialogComponent,
      { ride: this.ride },
      'ride-rating-modal'
    );
    dialog.present();
    dialog.onDidDismiss().then(() =>
    {
      this.util.goToNew('/rides/completed')
    })
  }

  async goToGreetingSign() {
    const dialog = await this.util.createModal(
      GreetingSignPage,
      { ride: this.ride },
      'greeting-sign-dialog'
    );
    dialog.present();
  }
  ngOnDestroy(): void {
    clearInterval(this.wtInterval);
  }
}
