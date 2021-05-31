import { Platform } from '@ionic/angular';
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

  constructor(private registrationService: RegistrationService, private platform: Platform) {
    this.stepsCount = this.registrationService.steps.length;
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.registrationService.back();
    });
   }

  ngOnInit() {
    this.registrationService.onChangeStep.subscribe(() => {
      if (!this.registrationService.actualStep)
      {
        return;
      }
      this.actualStep = this.registrationService.actualStep;
      let sectionSteps = this.registrationService.steps.filter(e => e.section == this.actualStep.section);
      this.stepsCount = sectionSteps.length;
      this.nextStep = sectionSteps[this.registrationService.actualStepIndex + 1];
      this.actualStepIndex = sectionSteps.findIndex(e => e.title == this.actualStep.title);
      this.percentageStep = Math.trunc((100 / sectionSteps.length) * (this.actualStepIndex + 1));
    })
  }

}
