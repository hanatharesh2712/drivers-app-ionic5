import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private util: UtilService,
    private _fb: FormBuilder) {
    this.registrationService.setStep(2);
   
  }

  ngOnInit() {
    let storage = this.registrationService._storageInfo;
    if (this.storage)
    {
      this.isUsa = storage.dialCode == '+1';
    }
    this.partnerForm = this._fb.group(
      {
        company_name: ['', Validators.required],
        company_structure: ['', this.isUsa ? Validators.required : null],
        address: ['', Validators.required],
        address_details: '',
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

  nextStep() {
    let storage = this.registrationService._storageInfo;
    storage.is_driver = this.is_driver;
    this.registrationService._storageInfo = storage;
    this.registrationService.next();
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
