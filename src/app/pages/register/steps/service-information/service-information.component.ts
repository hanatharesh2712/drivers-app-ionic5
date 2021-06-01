import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrationAPIService } from '@app/services/registration-api.service';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';

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
  additionalServicesOption  = {
    header: 'Additional Services',
    message: 'Select all that apply',
    translucent: true
  };
  constructor(private registrationService: RegistrationService,
    private registrationAPIService: RegistrationAPIService) {
    this.registrationService.setStep(3);
   }

  ngOnInit() {
    this.registrationAPIService.getRegistrationData().then(response => {

    })
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
