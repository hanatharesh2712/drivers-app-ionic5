import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DrvnAuthenticationService } from './../../../../services/auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrationAPIService } from '@app/services/registration-api.service';
import { RegistrationService } from '@app/services/registration.service';

export function atLeastOneValidator(control: FormControl) {
  if (control.value.length > 0) {
    return null;
  }
  else {
    return {
      atLeastOne: true
    }
  }
}
@Component({
  selector: 'app-service-information',
  templateUrl: './service-information.component.html',

  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./service-information.component.scss']
})
export class ServiceInformationComponent implements OnInit {


  codeSent = false;
  validationSuccess: boolean;
  airportsSelectOptions = {
    header: 'Airports',
    message: 'Select airports where you are able to provide service',
    translucent: true
  };
  cruisePortsSelectOptions = {
    header: 'Cruise Ports',
    message: 'Select airports where you are able to provide service',
    translucent: true
  };
  additionalServicesOption = {
    header: 'Additional Services',
    message: 'Select all that apply',
    translucent: true
  };
  data: unknown;
  loggedInUser: any;
  servicesForm: FormGroup;
  constructor(
    private registrationService: RegistrationService,
    private registrationAPIService: RegistrationAPIService,
    private authService: DrvnAuthenticationService,
    private _fb: FormBuilder) {
    this.registrationService.setStep(3);
    this.servicesForm = this._fb.group(
      {
        airports: this._fb.control([], atLeastOneValidator),
        seaports: this._fb.control([], atLeastOneValidator),
        options: this._fb.control([]),
      }
    )
  }

  ngOnInit() {
    this.loggedInUser = this.authService.currentUser;
    this.registrationService.getRegistrationData().then(response => {
      this.data = response;
    })
  }

  nextStep() {
    this.registrationService.savePartnerExtraData(this.servicesForm.getRawValue());

  }



  back() {
    this.registrationService.back();
  }



}
