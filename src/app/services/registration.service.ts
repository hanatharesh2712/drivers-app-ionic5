import { RegistrationAPIService } from '@app/services/registration-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@app/models/review';
import { environment } from '@env/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Storage } from '@ionic/storage';
import { UtilService } from './util/util.service';
import { AbstractControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  steps = [
    {
      title: 'Mobile Verification',
      done: false,
      url: 'register/mobile-validation',
      section: 'Verification Proccess'
    },
    {
      title: 'Email Verification',
      done: false,
      url: 'register/email-validation',
      section: 'Verification Proccess'
    },
    {
      title: 'Company Information',
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
      title: 'Payment Preference',
      done: false,
      url: 'register/payment-information',
      section: 'Registration'
    }
  ];
  actualStepIndex: number = 0;
  actualStep;
  onChangeStep = new BehaviorSubject({});
  storageInfo: any;
  dialCode: any;
  mobile_phone: any;
  partner_email: any;
  is_driver: string;
  registrationData;
  constructor(
    private util: UtilService,
    private storage: Storage,
    private registrationAPIService: RegistrationAPIService) {

  }


  setStep(index) {
    this.actualStepIndex = index;
    this.actualStep = this.steps[this.actualStepIndex];
    this.onChangeStep.next(this.actualStep);
  }

  getRegistrationData() {
    return new Promise((resolve, reject) => {
      if (this.registrationData) {
        resolve(this.registrationData);
      }
      else {
        this.registrationAPIService.getRegistrationData().then(response => {
          this.registrationData = response;
          resolve(response);
        })
      }

    })

  }

  next() {
    this.actualStep.done = true;
    this.setStep(this.actualStepIndex + 1);
    this.util.goForward(this.actualStep.url);
  }

  back() {
    if (this.actualStepIndex != 0) {
      this.setStep(this.actualStepIndex - 1);
      this.util.goBack(this.actualStep.url);
    }
    else {
      this.util.goBack('login')
    }

  }

  initStorageData() {
    this.storage.set('registration', {}).then((newStorageInfo) => {
      this.storageInfo = newStorageInfo;
    });

  }

  get _storageInfo() {
    return this.storageInfo;
  }

  set _storageInfo(value) {
    this.storage.set('registration', value).then((newStorageInfo) => {
      this.storageInfo = newStorageInfo;
    });
  }

  regexMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const password = c.value;
    let minLength = false;
    let uppercase = false;
    let symbol = false;
    let atLeastOneError = false;

    if (c.pristine) {
      return null;
    }

    if (!/^.{7,}$/.test(password)) {
      minLength = true;
      atLeastOneError = true;
    }

    if (!/[A-Z][a-z]/.test(password)) {
      uppercase = true;
      atLeastOneError = true;
    }

    if (!/[$-/:-?{-~!"@^_`\[\]]/.test(password)) {
      symbol = true;
      atLeastOneError = true;
    }

    if (atLeastOneError) {
      return {
        'minLength': minLength,
        'upperCase': uppercase,
        'symbol': symbol,
      };
    }
    return null;

  }

  savePartnerExtraData(data)
  {
    this.registrationAPIService.savePartnerExtraData(data).then((response: any) => {
      if (response.status.toUpperCase() == 'SUCCESS') {
        this.next();
      }
      else
      {
        this.showError("There was an error trying to save the information. Please try again.");
      }
    }, error =>
    {
      this.showError("There was an error trying to save the information. Please try again.");
    })
  }


  savePartnerVehicleData(data)
  {
    this.registrationAPIService.savePartnerVehicleData(data).then((response: any) => {
      if (response.status.toUpperCase() == 'SUCCESS') {
        this.next();
      }
      else
      {
        this.showError("There was an error trying to save vehicle information. Please try again.");
      }
    }, error =>
    {
      this.showError("There was an error trying to save vehicle information. Please try again.");
    })
  }



  savePartnerBankInformation(data)
  {
    this.registrationAPIService.savePartnerBankInformation(data).then((response: any) => {
      if (response.status.toUpperCase() == 'SUCCESS') {
        // this.next();
      }
      else
      {
        this.showError("There was an error trying to save payment information. Please try again.");
      }
    }, error =>
    {
      this.showError("There was an error trying to save payment information. Please try again.");
    })
  }


  async showError(text)
  {
    let alert = await this.util.createAlert('Registration', true, text, {
      text: 'Ok',
      role: 'cancel',
      cssClass: 'secondary',
      handler: async () => {

      }
    });
    alert.present();
  }

}
