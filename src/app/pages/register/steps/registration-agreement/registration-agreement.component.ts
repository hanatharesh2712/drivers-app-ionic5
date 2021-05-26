import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-registration-ageement',
  templateUrl: './registration-agreement.component.html',
  styleUrls: ['./registration-agreement.component.scss']
})
export class RegistrationAgreementComponent implements OnInit {

  phoneNumber = "";
  codeSent = false;
  validationSuccess: boolean;
  constructor(private registrationService: RegistrationService) {
    this.registrationService.setStep(6);
   }

  ngOnInit() {
  }

 
  nextStep()
  {
    
    this.registrationService.next();
  }

  back()
  {
    this.registrationService.back();
  }
}
