import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    message: 'Select airports that you will give service',
    translucent: true
  };
  cruisePortsSelectOptions = {
    header: 'Cruise Ports',
    message: 'Select cruise ports that you will give service',
    translucent: true
  };
  constructor(private registrationService: RegistrationService) {
    this.registrationService.setStep(3);
   }

  ngOnInit() {
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
