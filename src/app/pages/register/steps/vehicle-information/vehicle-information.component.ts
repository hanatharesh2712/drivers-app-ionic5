import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartnerVehicleDialogComponent } from '@app/components/partner-vehicle-dialog/partner-vehicle-dialog.component';
import { PartnerVehicleDialogModule } from '@app/components/partner-vehicle-dialog/partner-vehicle-dialog.module';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';

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
  vehicleTypes: any;
  vehicleExteriorColors: any;
  filteredMakesByType: any;
  years = this.range( (new Date().getFullYear() - 20), new Date().getFullYear());
  maxPax: any;
  maxLug: any;

  constructor(private registrationService: RegistrationService,
    private util: UtilService,
    private _route: ActivatedRoute) {
    this.registrationService.setStep(4);
  }

  ngOnInit() {
    this.storage = this.registrationService._storageInfo;
    this.is_driver = true;
   // const _data = this._route.snapshot.data.data;
   // this.vehicleTypes = _data.vehicle_types;
  //  this.vehicleMakesByType = this.filteredMakesByType = _data.vehicleMakesByType;
   // this.vehicleInteriorColors = _data.vehicle_colors.filter(e => e.is_interior);
  //  this.vehicleExteriorColors = _data.vehicle_colors.filter(e => e.is_exterior);


  }

  nextStep() {
    this.registrationService.next();
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


  changeVehicleType(vehicleTypeId, clearMake = false) {
    const vehicleType = this.vehicleTypes.find(e => e.id == vehicleTypeId);
    if (vehicleType) {
        this.years = this.range((new Date().getFullYear(), 0) - vehicleType.years_old, new Date().getFullYear());
        this.filteredMakesByType = this.vehicleMakesByType.filter(e => e.partner_vehicle_type_id == vehicleType.id);
        this.maxPax = vehicleType.max_pax;
        this.maxLug = vehicleType.max_lug;
       

    }
}

}
