import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrationService } from '@app/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  actualStep: any;
  nextStep;
  stepsCount: number;
  actualStepIndex: any;

  constructor(private registrationService: RegistrationService) {
    this.stepsCount = this.registrationService.steps.length;
   }

  ngOnInit() {
    this.registrationService.onChangeStep.subscribe(() => {
      this.actualStep = this.registrationService.actualStep;
      this.nextStep = this.registrationService.steps[this.registrationService.actualStepIndex + 1];
      this.actualStepIndex = this.registrationService.actualStepIndex;
    })
  }

}
