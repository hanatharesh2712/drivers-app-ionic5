import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrationService } from '@app/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./register-page.component.scss',
  './circle.css']
})
export class RegisterPageComponent implements OnInit {
  actualStep: any;
  nextStep;
  stepsCount: number;
  actualStepIndex: any;
  percentageStep: number;

  constructor(private registrationService: RegistrationService) {
    this.stepsCount = this.registrationService.steps.length;
   }

  ngOnInit() {
    this.registrationService.onChangeStep.subscribe(() => {
      this.stepsCount = this.registrationService.steps.length;
      this.actualStep = this.registrationService.actualStep;
      this.nextStep = this.registrationService.steps[this.registrationService.actualStepIndex + 1];
      this.actualStepIndex = this.registrationService.actualStepIndex;
      this.percentageStep = Math.trunc((100 / this.registrationService.steps.length) * (this.actualStepIndex + 1));
    })
  }

}