import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',

  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./email-validation.component.scss']
})
export class EmailValidationComponent implements OnInit {


  codeSent = false;
  validationSuccess: boolean;
  constructor(private registrationService: RegistrationService) {
    this.registrationService.setStep(1);
  }

  ngOnInit() {
  }

  sendVerificationCode() {
    this.codeSent = true;
  }

  verifyCode() {
    this.validationSuccess = true;
  }

  nextStep() {
    this.registrationService.next();
  }

  back()
  {

    this.registrationService.back();
  }
}
