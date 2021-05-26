import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payment-information.component.scss']
})
export class PaymentInformationComponent implements OnInit {

  phoneNumber = "";
  codeSent = false;
  validationSuccess: boolean;
  payment_method = 'amex';
  storage: any;
  is_driver: boolean;
  constructor(private registrationService: RegistrationService,
    private util:UtilService) {
    this.registrationService.setStep(7);
   }

  ngOnInit() {
    this.storage = this.registrationService._storageInfo;
    if (!this.storage) {

      this.util.goForward('register/mobile-validation');
      return;
    }
    this.is_driver = (this.storage.is_driver ? this.storage.is_driver === 'true' : true)
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
