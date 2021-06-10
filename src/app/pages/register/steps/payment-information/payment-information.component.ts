import { DrvnAuthenticationService } from './../../../../services/auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payment-information.component.scss']
})
export class PaymentInformationComponent implements OnInit {

  payment_method = 'amex';
  storage: any;
  is_driver: boolean;
  bankAccountType = null;
  bankInfoForm: any;
  isUsa: boolean;
  loggedInUser: any;
  submitted = false;
  constructor(private registrationService: RegistrationService,
    private util: UtilService,
    private authService: DrvnAuthenticationService,
    private _fb: FormBuilder) {
    this.registrationService.setStep(6);
  }

  ngOnInit() {
    this.loggedInUser = this.authService.currentUser;
    this.isUsa = this.loggedInUser.partner.mobile_phone_area_code == '+1';
    this.is_driver = this.loggedInUser.partner_type != 3 ;
    this.bankInfoForm = this._fb.group({
      bank_name: [
        "",
        Validators.required,
      ],
      account_holder_name: [
        "",
        Validators.required,
      ],
      account_number: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(17)],
      ],
      re_account_number: [
        "",
        Validators.required,
      ],
      routing_number: [
        "",
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      payment_method_id: [
        {value: 5, disabled: !this.isUsa},
        Validators.required,
      ],
      is_personal: [
        "",
        Validators.required,
      ],
      is_saving: [
        "",
        Validators.required,
      ],
    }, { validator: this.accNumberValidator });
  }

  accNumberValidator(frm: FormGroup) {
    if (frm.controls['re_account_number'].value === frm.controls['account_number'].value) {
      frm.controls['re_account_number'].setErrors(null);
      return null;
    }
    else {
      frm.controls['re_account_number'].setErrors({ 'mismatch': true });
      return { 'mismatch': true }
    };
  }

  changeBankAccountType(value) {
    let val = [];
    switch (value) {
      case "business_checking":
        val = [0, 0];
        break;
      case "business_saving":
        val = [0, 1];
        break;
      case "personal_checking":
        val = [1, 0];
        break;
      case "personal_saving":
        val = [1, 1];
        break;

      default:
        break;
    }

    this.bankInfoForm.get("is_personal").setValue(val[0]);
    this.bankInfoForm.get("is_saving").setValue(val[1]);
  }



  save() {
    this.registrationService.savePartnerBankInformation(this.bankInfoForm.getRawValue()).then(response =>
      {
        this.submitted = true;
      });
  }

  nextStep() {
    this.util.goToNew('home');
  }

  back() {
    this.registrationService.back();
  }
}
