import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-mobile-validation',
  templateUrl: './mobile-validation.component.html',

  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./mobile-validation.component.scss']
})
export class MobileValidationComponent implements OnInit {


  codeSent = false;
  validationSuccess: boolean;
  constructor(private registrationService: RegistrationService) {
    this.registrationService.setStep(0);
   }

  ngOnInit() {
  }

  sendVerificationCode() {
    this.codeSent = true;
  }

  verifyCode() {
    this.validationSuccess = true;
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
