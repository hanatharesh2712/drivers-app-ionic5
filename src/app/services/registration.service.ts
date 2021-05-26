import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@app/models/review';
import { environment } from '@env/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Storage } from '@ionic/storage';
import { UtilService } from './util/util.service';
@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  steps = [
    {
      title: 'Mobile Validation',
      done: false,
      url: 'register/mobile-validation',
      section: 'Validation'
    },
    {
      title: 'Email Validation',
      done: false,
      url: 'register/email-validation',
      section: 'Validation'
    },
    {
      title: 'Personal Information',
      done: false,
      url: 'register/partner-information',
      section: 'Registration'
    },
    {
      title: 'Service Description',
      done: false,
      url: 'register/service-information',
      section: 'Registration'
    },
    {
      title: 'Vehicle Information',
      done: false,
      url: 'register/vehicle-information',
      section: 'Registration'
    },
    {
      title: 'Required Documents',
      done: false,
      url: 'register/documents',
      section: 'Registration'
    },
    {
      title: 'Agreement',
      done: false,
      url: 'register/agreement',
      section: 'Registration'
    },
    {
      title: 'Payment information',
      done: false,
      url: 'register/payment-information',
       section: 'Registration'
    }
  ];
  actualStepIndex: number = 0;
  actualStep;
  onChangeStep = new BehaviorSubject({});
  storageInfo: any;
  constructor(private utl: UtilService,
    private storage: Storage) {

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
    if (this.actualStepIndex != 0)
    {
      this.setStep(this.actualStepIndex - 1);
      this.utl.goBack(this.actualStep.url);
    }
    else
    {
      this.utl.goBack('login')
    }

  }

  initStorageData()
  {
    this.storage.set('registration', {}).then((newStorageInfo) => {
      this.storageInfo = newStorageInfo;
    });
    
  }

  get _storageInfo()
  {
    return this.storageInfo;
  }

  set _storageInfo(value)
  {
    this.storage.set('registration', value).then((newStorageInfo) => {
      this.storageInfo = newStorageInfo;
    });
  }
}
