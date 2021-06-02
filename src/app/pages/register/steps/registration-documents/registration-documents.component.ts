import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PartnerVehicleDialogComponent } from '@app/components/partner-vehicle-dialog/partner-vehicle-dialog.component';
import { PartnerVehicleDialogModule } from '@app/components/partner-vehicle-dialog/partner-vehicle-dialog.module';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-registration-documents',
  templateUrl: './registration-documents.component.html',

  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./registration-documents.component.scss']
})
export class RegistrationDocumentsComponent implements OnInit {
  is_driver: boolean;

  constructor(private registrationService: RegistrationService,
    private util: UtilService) {
    this.registrationService.setStep(5);
  }

  ngOnInit() {
    this.is_driver = true;
  }

  nextStep() {
    this.registrationService.next();
  }

  back() {
    this.registrationService.back();
  }


}
