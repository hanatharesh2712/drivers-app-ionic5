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

  phoneNumber = "";
  codeSent = false;
  validationSuccess: boolean;
  secondsRemainingResendCode: number = 60;
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
    if (!this.codeSent)
    {
      this.codeSent = true;
      setInterval(() => {
        if (this.secondsRemainingResendCode > 0) {
          this.secondsRemainingResendCode--;
        }
  
      }, 1000)
      return;
    }
    if (this.codeSent && !this.validationSuccess)
    {
      this.validationSuccess = true;
      return;
    }
    this.registrationService.next();
  }

  back()
  {
    this.registrationService.back();
  }
}
