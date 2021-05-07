import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RideMapDialogComponent } from '@app/components/ride-map-dialog/ride-map-dialog.component';
import { RideMapComponent } from '@app/components/ride-map/ride-map.component';
import { RidePricingPopoverComponent } from '@app/components/ride-pricing-popover/ride-pricing-popover.component';
import { SettleDialogComponent } from '@app/components/settle-dialog/settle-dialog.component';
import { Ride } from '@app/models/ride';
import { GeolocationService } from '@app/services/geolocation.service';
import { RideService } from '@app/services/ride/ride.service';
import { UtilService } from '@app/services/util/util.service';
import { NavParams, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
  canSettle: boolean = true;
  showingMap = false;
  isMapLoaded = false;
  @ViewChild(RideMapComponent, { static: false }) rideMap: RideMapComponent;
  loading: boolean;
  showTimeCounter: boolean;
  gracePeriodMins = 0.5;
  timeOnLocationSet: Date;
  minutesSinceOnLocation: string;
  secondsSinceOnLocation: string;
  isOnGracePeriod: boolean;
  gracePeriodPercentage: any;
  wtInterval: any;
  waitStartedDate: any;
  storageInfo: any = {};
  constructor(
    private rideService: RideService,
    private util: UtilService,
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private fb: FormBuilder,
    private geolocationService: GeolocationService,
    private storage: Storage
  ) {}

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
      this.ride.next_status_code &&
      !this.ride.is_offer &&
      !this.ride.is_done
    ) {
      this.isRideActive = true;
      if (this.ride.next_status_code == 'POB') {
        this.initWaitingTime();
      } else {
        this.showTimeCounter = false;
      }
      if (!this.geolocationService.started) {
        this.geolocationService.initTracking();
      }
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
      }
    });
  }

  updateStorage(newInfo) {
    this.storage.set('ride-' + this.ride_id, newInfo).then(newValue =>
      {
        this.storageInfo = newValue;
      });
  }
  createSettleForm() {
    this.settleForm = this.fb.group({
      ride_id: this.ride_id,
      waiting: 0,
      stops: 0,
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

  async openSettle() {
    this.settlingRide = true;
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

  increase(fieldName, increment) {
    const control = this.settleForm.get(fieldName);
    control.setValue(control.value + increment);
  }

  decrease(fieldName, decrement) {
    const control = this.settleForm.get(fieldName);
    if (control.value != 0) {
      control.setValue(control.value - decrement);
    }
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
    this.rideService.changeStatus(this.ride).then((response: Ride) => {
      if (response) {
        this.initRide(response);
      } else {
        //    this.isDone = true;
        //    this.openRating();
      }
    });
  }

  async openRoutingMap() {
    const dialog = await this.util.createModal(
      RideMapDialogComponent,
      { ride: this.ride },
      'ride-map-dialog'
    );
    dialog.present();
  }

  expandMap(event) {
    event.stopPropagation();
    this.showingMap = !this.showingMap;
  }

  callSuport() {
    this.util.callSuport();
  }

  sendSMS() {
    this.util.sendSms(this.ride.passenger_number);
  }

  callPassenger() {
    this.util.call(this.ride.passenger_number);
  }

  initWaitingTime() {
    this.showTimeCounter = true;
    this.timeOnLocationSet = new Date(
      this.ride.times.find((e) => e.type_id == 3).time
    );

    this.wtInterval = setInterval(() => {
      this.calculateTimerValue();
    }, 1000);
  }

  calculateTimerValue() {
    if (this.timeOnLocationSet) {
      let difInDates =
        new Date(
          new Date(this.timeOnLocationSet).getTime() +
            this.gracePeriodMins * 60000
        ).getTime() - new Date().getTime();
      let secondsDif = difInDates / 1000;
      if (secondsDif < 0) {
        this.isOnGracePeriod = false;
        if (this.storageInfo.waitStartedDate) {
          difInDates =
            new Date().getTime() -
            new Date(this.storageInfo.waitStartedDate).getTime();
          secondsDif = Math.abs(difInDates / 1000);
          this.minutesSinceOnLocation = this.pad(
            Math.trunc(secondsDif / 60),
            2
          );
          this.secondsSinceOnLocation = this.pad(
            Math.trunc(secondsDif % 60),
            2
          );
        }
      } else {
        this.isOnGracePeriod = true;
        this.gracePeriodPercentage = (
          ((((this.gracePeriodMins - secondsDif / 60) * 100) /
            this.gracePeriodMins) *
            175) /
          100
        ).toFixed(2);
        secondsDif = Math.abs(secondsDif);
        this.minutesSinceOnLocation = this.pad(Math.trunc(secondsDif / 60), 2);
        this.secondsSinceOnLocation = this.pad(Math.trunc(secondsDif % 60), 2);
      }
    }
  }

  startWTTime() {
    this.storageInfo.waitStartedDate = new Date().getTime();
    this.updateStorage(this.storageInfo);
  }
  pad(num, size) {
    num = num.toString();
    while (num.length < size) num = '0' + num;
    return num;
  }

  async requestConfirmStop() {
    if (this.storageInfo.requestedStop)
    {
      const alert = await this.util.createAlert(
        'CONFIRM STOP LOCATION',
        false,
        'Are you on the stop location?',
        {
          text: 'Not yet',
          handler: () => {},
        },
        {
          text: 'Yes, confirm',
          handler: () => {},
        }
      );
      alert.present();
    }
    else {
      const alert = await this.util.createAlert(
        'STOP REQUESTED',
        false,
        'Now, please confirm when you arrive to the stop location',
        {
          text: 'Confirm',
          handler: () => {
            this.storageInfo.requestedStop = true;
            this.updateStorage(this.storageInfo);
          },
        }
      );
      alert.present();
    }


  }

  async confirmStop() {

  }

  ngOnDestroy(): void {
    clearInterval(this.wtInterval);
  }
}
