import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationAPIService } from '@app/services/registration-api.service';
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
  secondsRemainingResendCode: number = 60;
  code: any;
  resendInterval: any;
  otpcode: any;
  emailForm: FormGroup;
  constructor(private registrationService: RegistrationService,
    private util: UtilService,
    private registrationAPIService: RegistrationAPIService,
    private _fb: FormBuilder) {
    this.registrationService.setStep(1);
    this.emailForm = this._fb.group(
      {
        email: ['', [Validators.email, Validators.required]]
      }
    )
  }

  ngOnInit() {
  }

  sendVerificationCode() {
    this.codeSent = true;
  }

    
  sendCode()
  {
    this.registrationAPIService.sendRegistrationEmailCode(this.emailForm.get('email').value).then(
      async (response : any) => 
      {
        if (response.status.toUpperCase() == 'SUCCESS')
        {
          this.code = response.code;
          this.codeSent = true;
          window.clearInterval(this.resendInterval);
          this.resendInterval = setInterval(() => {
            if (this.secondsRemainingResendCode > 0) {
              this.secondsRemainingResendCode--;
            }
      
          }, 1000)
        }
        else
        {
          let alert = await this.util.createAlert('Email Verification', true, response.message, {
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

  resendCode()
  {
    if (this.secondsRemainingResendCode <= 0)
    {
      this.sendCode();
      this.secondsRemainingResendCode = 60;
    }
  }

  async verify() {
    if (this.code == this.otpcode)
    {
      this.validationSuccess = true;
    }
    else
    {
      let alert = await this.util.createAlert('Email Verification', true, 'Invalid code. Try again.', {
        text: 'Ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async () => {
  
        }
      });
      alert.present();    
    }
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
