import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-partner-information',
  templateUrl: './partner-information.component.html',

  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./partner-information.component.scss']
})
export class PartnerInformationComponent implements OnInit {

  submitted: boolean;
  is_driver: boolean = true;
  companySelectOptions = {
    header: 'Company Structure',
    message: 'Select the legal form of your company',
    translucent: true
  };
  storage: any;
  constructor(private registrationService: RegistrationService,
    private util: UtilService) {
    this.registrationService.setStep(2);
  }

  ngOnInit() {
   
  }

  nextStep() {
    if (!this.submitted) {
      this.submitted = true;
    }
    else {
      let storage = this.registrationService._storageInfo;
      storage.is_driver = this.is_driver;
      this.registrationService._storageInfo = storage;
      this.registrationService.next();
      this.submitted = false;
    }
  }

  back() {
    this.registrationService.back();
  }
}
