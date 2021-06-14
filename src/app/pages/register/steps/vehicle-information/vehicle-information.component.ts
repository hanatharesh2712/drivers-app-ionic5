import { DrvnAuthenticationService } from './../../../../services/auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartnerVehicleDialogComponent } from '@app/components/partner-vehicle-dialog/partner-vehicle-dialog.component';
import { PartnerVehicleDialogModule } from '@app/components/partner-vehicle-dialog/partner-vehicle-dialog.module';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-information',
  templateUrl: './vehicle-information.component.html',

  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./vehicle-information.component.scss']
})
export class VehicleInformationComponent implements OnInit {


  codeSent = false;
  validationSuccess: boolean;
  storage: any;
  is_driver: boolean;
  vehicleInteriorColors: any;
  vehicleMakesByType: any;
  vehicleTypes: any[] = [];
  vehicleExteriorColors: any[] = [];
  filteredMakesByType: any[] = [];
  years = this.range((new Date().getFullYear() - 20), new Date().getFullYear());
  minPax = 1;
  maxPax = 4;
  maxLug = 6;
  loggedInUser: any;
  data: any;
  vehicleForm: any;
  vehicleTypesGroup: any[] = [];

  constructor(private registrationService: RegistrationService,
    private util: UtilService,
    private authService: DrvnAuthenticationService,
    private _fb: FormBuilder) {
    this.registrationService.setStep(4);
  }

  ngOnInit() {

    this.loggedInUser = this.authService.currentUser;
    this.is_driver = this.loggedInUser.partner_type != 3;
    this.registrationService.getRegistrationData().then(response => {
      this.data = response;
      this.vehicleTypes = this.data.partnerVehicleTypes;
      this.vehicleTypesGroup = this.data.partnerVehicleTypeGroups;
      this.vehicleMakesByType = this.filteredMakesByType = this.data.partnerVehicleMakeModels;
      this.vehicleInteriorColors = this.data.vehicleColors.filter(e => e.is_interior);
      this.vehicleExteriorColors = this.data.vehicleColors.filter(e => e.is_exterior);
    })
    this.vehicleForm = this._fb.group({
      make: ['', Validators.required],
      year: ['', Validators.required],
      passenger_count: ['', Validators.required],
      luggage_count: ['', Validators.required],
      partner_vehicle_type_id: ['', Validators.required],
      exterior_color_id: ['', Validators.required],
      interior_color_id: ['', Validators.required],
    });


  }

  nextStep() {
    this.registrationService.savePartnerVehicleData(this.vehicleForm.getRawValue());
  }

  back() {
    this.registrationService.back();
  }

  async addVehicleClass() {
    const modal = await this.util.createModal(PartnerVehicleDialogComponent,
      {}, 'partner-vehicle-dialog');
    modal.present();
  }

  range(start, end) {
    const list = [];
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list;
  }


  changeVehicleType(vehicleTypeId) {
    const vehicleTypesOfGroupId = this.vehicleTypes.filter(e => e.partner_vehicle_type_group_id == vehicleTypeId).map(e => e.id);
    this.filteredMakesByType = this.vehicleMakesByType.filter(e => vehicleTypesOfGroupId.indexOf(e.partner_vehicle_type_id) !== -1);
  }

  changeModel(vehicleModelName) {
    const vehicleModel = this.vehicleMakesByType.find(e => e.name == vehicleModelName);
    if (
      vehicleModel
    ) {
      const vehicleType = this.vehicleTypes.find(e => e.id === vehicleModel.partner_vehicle_type_id);
      this.vehicleForm.get('partner_vehicle_type_id').setValue(vehicleModel.partner_vehicle_type_id);
      if (vehicleType) {
        this.years = this.range(new Date().getFullYear() - vehicleType.years_old, new Date().getFullYear());
        this.maxPax = vehicleType.max_pax;
        this.minPax = vehicleType.min_pax;
        this.maxLug = vehicleType.max_lug;
      }

    }
    else {
      this.vehicleForm.get('partner_vehicle_type_id').setValue(null);
    }

  }

}
