import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RegistrationAPIService } from '@app/services/registration-api.service';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-mobile-validation',
  templateUrl: './mobile-validation.component.html',

  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./mobile-validation.component.scss']
})
export class MobileValidationComponent implements OnInit {

  phoneNumber;
  codeSent = false;
  validationSuccess: boolean;
  secondsRemainingResendCode: number = 60;
  @ViewChild('warning', { static: false }) warning: any;
  otpcode: any = '';
  resendInterval: any;
  constructor(private registrationService: RegistrationService,
    private registrationAPIService: RegistrationAPIService,
    private util: UtilService) {
    this.registrationService.setStep(0);
  }

  ngOnInit() {
  }


  sendCode() {
    this.registrationAPIService.sendRegistrationPhoneCode(this.replaceSymbols()).then(
      async (response: any) => {
        if (response.status.toUpperCase() == 'SUCCESS') {
          this.codeSent = response.code;
          alert(this.codeSent);
          window.clearInterval(this.resendInterval);
          this.resendInterval = setInterval(() => {
            if (this.secondsRemainingResendCode > 0) {
              this.secondsRemainingResendCode--;
            }

          }, 1000)
        }
        else {
          let alert = await this.util.createAlert('Mobile Verification', true, response.message, {
            text: 'Ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: async () => {

            }
          });
          alert.present();
        }

      }
    )
  }

  resendCode() {
    if (this.secondsRemainingResendCode <= 0) {
      this.sendCode();
      this.secondsRemainingResendCode = 60;
    }
  }

  async verify() {
    if (this.codeSent == this.otpcode) {
      this.validationSuccess = true;
      this.registrationService.dialCode = this.phoneNumber.dialCode;
      this.registrationService.mobile_phone = this.replaceSymbols();
      setTimeout(() => {
        this.registrationService.next();
      }, 500);
    }
    else {
      let alert = await this.util.createAlert('Mobile Verification', true, 'Invalid code. Try again.', {
        text: 'Ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async () => {

        }
      });
      alert.present();
    }
  }


  replaceSymbols() {
    if (this.phoneNumber.dialCode == '+1') {
      this.phoneNumber.internationalNumber = this.phoneNumber.internationalNumber.replace('+1', '')
    }
    return this.phoneNumber.internationalNumber.replace(/\s/g, "").replace(/-/g, '');
  }

  onOtpChange(otp) {
    this.otpcode = otp;
  }

  back() {
    if (this.codeSent)
    {
      this.codeSent = null;
      return;
    }
    this.registrationService.back();
  }
}
