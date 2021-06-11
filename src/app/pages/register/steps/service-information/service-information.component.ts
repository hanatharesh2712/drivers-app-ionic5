import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DrvnAuthenticationService } from './../../../../services/auth/auth.service';
import { Component, Inject, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { RegistrationAPIService } from '@app/services/registration-api.service';
import { RegistrationService } from '@app/services/registration.service';
import { DOCUMENT } from '@angular/common';

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
  listener;
  checkBoxes: any;
  noneCheckBox: any;
  constructor(
    private registrationService: RegistrationService,
    private registrationAPIService: RegistrationAPIService,
    private authService: DrvnAuthenticationService,
    private _fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
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


  openSelector(selector) {
    selector.open().then((alert) => {
      this.checkBoxes = this.document.getElementsByClassName("alert-checkbox");
      this.noneCheckBox = this.checkBoxes[0];
      this.listener = this.renderer.listen(this.noneCheckBox, 'click', () => {
        let i = 0;
        setTimeout(() => {
          if (this.noneCheckBox.ariaChecked === "true") {
            for (let checkbox of this.checkBoxes) {
              if (i != 0) {
                if (checkbox.ariaChecked === "true") {
                  (checkbox as HTMLButtonElement).click();
                };
              }
              i++;
            };
          }
        }, 100);

      });
      let x = 0;
      for (let checkbox of this.checkBoxes) {
        if (x != 0) {
          this.renderer.listen(checkbox, 'click', () => {
            setTimeout(() => {
            if (checkbox.ariaChecked === "true") {
              if (this.noneCheckBox.ariaChecked === "true") {
                (this.noneCheckBox as HTMLButtonElement).click();
              };
            }
          } , 500) });

        }
        x++;

      };
      alert.onWillDismiss().then(() => {
        this.listener();
      });
    })
  }


}
