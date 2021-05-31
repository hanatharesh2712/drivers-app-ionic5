import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationAPIService } from '@app/services/registration-api.service';
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
  is_driver = 'true';
  companySelectOptions = {
    header: 'Company Structure',
    message: 'Select the legal business entity of your company (US companies only)',
    translucent: true
  };
  storage: any;
  isUsa: boolean;
  partnerForm: FormGroup;
  constructor(private registrationService: RegistrationService,
    private registrationAPIService: RegistrationAPIService,
    private util: UtilService,
    private _fb: FormBuilder) {
    this.registrationService.setStep(2);
   
  }

  ngOnInit() {
    
    if (this.registrationService.mobile_phone)
    {
      this.isUsa = this.registrationService.dialCode == '+1';
      this.partnerForm = this._fb.group(
        {
          company_name: ['', Validators.required],
          company_structure: ['', this.isUsa ? Validators.required : null],
          address: ['', Validators.required],
          address_details: '',
          partner_email: this.registrationService.partner_email,
          mobile_phone: this.registrationService.mobile_phone,
          address_lat: ['', Validators.required],
          address_lng: ['', Validators.required],
          address_city: ['', Validators.required],
          address_state: ['', Validators.required],
          address_country: ['', Validators.required],
          is_driver: ['true', Validators.required],
          first_name: ['', Validators.required],
          last_name: ['', Validators.required]
        }
      )
    }
    else
    {
      this.util.goForward('register/mobile-validation');
      return;
    }
  
  }

  nextStep() {
    this.registrationService.is_driver = this.is_driver;

    this.registrationAPIService.submitPartnerInformation(this.partnerForm.getRawValue()).then(
      (response: any) =>
      {
        if (response.status.toUpperCase() == 'SUCCESS')
        {
          this.registrationService.next();
        }
      }
    )
    this.submitted = false;
  }

  back() {
    this.registrationService.back();
  }

  addressChanged(location)
  {
    Object.keys(location).forEach(field => {
        if (this.partnerForm.get(field))
        {
          this.partnerForm.get(field).setValue(location[field]);
        }
    });
    console.log(this.partnerForm.getRawValue())
  }
}
