import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@app/models/review';
import { environment } from '@env/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { UtilService } from './util/util.service';
@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  steps = [
    {
      title: 'Mobile Validation',
      done: false,
      url: 'register/mobile-validation'
    },
    {
      title: 'Email Validation',
      done: false,
      url: 'register/email-validation'
    },
    {
      title: 'Personal Information',
      done: false,
      url: 'register/partner-information'
    }
  ];
  actualStepIndex: number = 0;
  actualStep;
  onChangeStep = new BehaviorSubject({});
  constructor(private utl: UtilService) {
 
  }


  setStep(index)
  {
    this.actualStepIndex = index;
    this.actualStep = this.steps[this.actualStepIndex];
    this.onChangeStep.next(this.actualStep);
  }


  next() {
    this.actualStep.done = true;
    this.setStep(this.actualStepIndex + 1);
    this.utl.goForward(this.actualStep.url);
  }

  back() {
    this.setStep(this.actualStepIndex - 1);
    this.utl.goBack(this.actualStep.url);
  }
}
