import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  constructor(private registrationService: RegistrationService) {
    this.registrationService.setStep(2);
   }

  ngOnInit() {
  }

  nextStep()
  {
    if (!this.submitted)
    {
      this.submitted = true;
    }
    else
    {
      this.registrationService.next();
    }
  }

  back()
  {
    this.registrationService.back();
  }
}
