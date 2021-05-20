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
  constructor(private registrationService: RegistrationService) {
    this.registrationService.setStep(2);
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
