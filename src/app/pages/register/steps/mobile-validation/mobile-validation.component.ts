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
  code: any;
  otpcode: any = '';
  resendInterval: any;
  constructor(private registrationService: RegistrationService,
    private registrationAPIService: RegistrationAPIService,
    private util: UtilService) {
    this.registrationService.setStep(0);
  }

  ngOnInit() {
  }

  sendVerificationCode() {
    this.codeSent = true;
  }


  sendCode() {
    this.registrationAPIService.sendRegistrationPhoneCode(this.replaceSymbols()).then(
      async (response: any) => {
        if (response.status.toUpperCase() == 'SUCCESS') {
          this.code = response.code;
          this.codeSent = true;
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
    if (this.code == this.otpcode) {
      this.validationSuccess = true;
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
  nextStep() {
    let storage = this.registrationService._storageInfo;
    storage.dialCode = this.phoneNumber.dialCode;
    this.registrationService._storageInfo = storage;
    this.registrationService.next();

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
    this.registrationService.back();
  }
}
