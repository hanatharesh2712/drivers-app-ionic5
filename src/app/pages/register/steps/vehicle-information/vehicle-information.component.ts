import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  constructor(private registrationService: RegistrationService,
    private util: UtilService) {
    this.registrationService.setStep(4);
  }

  ngOnInit() {
    this.storage = this.registrationService._storageInfo;

    if (!this.storage) {

      this.util.goForward('register/mobile-validation');
      return;
    }
    this.is_driver = (this.storage.is_driver === 'true')

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
}
