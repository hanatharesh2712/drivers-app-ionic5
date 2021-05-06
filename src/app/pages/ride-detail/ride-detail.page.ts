import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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

@Component({
  selector: 'ride-detail',
  templateUrl: './ride-detail.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./ride-detail.page.scss'],
})
export class RideDetailPage implements OnInit {
  ride: Ride;
  ride_id: any;
  settlingRide: boolean;
  showingPricing = false;
  settleForm: FormGroup;
  isRideActive = true;
  canSettle: boolean = true;
  showingMap = false;
  @ViewChild(RideMapComponent, { static: false }) rideMap: RideMapComponent;
  constructor(
    private rideService: RideService,
    private util: UtilService,
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private fb: FormBuilder,
    private geolocationService: GeolocationService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.ride_id = params['ride_id'];
      if (this.ride_id) {
        this.initRide();
      } else {
        this.util.goBack('my-rides');
      }
    });
  }

  initRide() {
    this.getRideInfo();
    this.createSettleForm();

    this.geolocationService.initTracking();
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
    const loader = await this.util.createLoader('Getting Ride details ...');
    loader.present();
    this.rideService.getRideInfo(this.ride_id).subscribe((response: any) => {
      if (response.ride) {
        this.ride = response.ride;
        if (refresher) {
          refresher.target.complete();
        }
      } else {
        this.util.goBack('my-rides');
      }
      loader.dismiss();
    });
  }
  acceptRide() {
    this.rideService.acceptRide(this.ride).then((response) => {
      if (response) {
        this.util.createToast(
          'Your ride offer was accepted. Thank you!',
          false,
          'bottom',
          4000
        );
        this.initRide();
      }
    });
  }

  async openSettle() {
    this.settlingRide = true;
  }

  rejectRide() {
    this.rideService.rejectRide(this.ride).then((response) => {
      if (response) {
        this.util.createToast(
          'Your ride offer was rejected. Thank you!',
          false,
          'bottom',
          4000
        );
        this.util.goBack('my-rides');
      }
    });
  }

  async doRefresh(refresher) {
    this.getRideInfo(refresher);
  }

  closeFooters() {
    this.settlingRide = false;
    this.showingPricing = false;
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

  increase(fieldName) {
    const control = this.settleForm.get(fieldName);
    control.setValue(control.value + 1);
  }

  decrease(fieldName) {
    const control = this.settleForm.get(fieldName);
    if (control.value != 0) {
      control.setValue(control.value - 1);
    }
  }

  setSettle() {
    const value = this.settleForm.getRawValue();
    this.rideService.sendSettle(value).then(async (response) => {
      if (response) {
        let toast = await this.util.createToast(
          'You settle has been sent. Thank you!',
          true,
          'bottom',
          4000
        );
        this.canSettle = false;
        toast.present();
      }
    });
  }

  async changeStatus() {
    this.rideService.changeStatus(this.ride).then((response) => {
      if (response) {
        // this.handleRide(response);
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



}
