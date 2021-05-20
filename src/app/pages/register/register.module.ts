import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { IonicModule } from '@ionic/angular';
import { MobileValidationComponent } from './steps/mobile-validation/mobile-validation.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '@app/directives/directives.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { EmailValidationComponent } from './steps/email-validation/email-validation.component';
import { PartnerInformationComponent } from './steps/partner-information/partner-information.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterPageComponent,
    children: [
      {
        path: 'mobile-validation',
        children: [
          {
            path: '',
            component: MobileValidationComponent,
          }
        ]
      },
      {
        path: 'email-validation',
        children: [
          {
            path: '',
            component: EmailValidationComponent,
          }
        ]
      },
      {
        path: 'partner-information',
        children: [
          {
            path: '',
            component: PartnerInformationComponent,
          }
        ]
      },

    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    NgOtpInputModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterPageComponent,
    MobileValidationComponent,
    EmailValidationComponent,
    PartnerInformationComponent]
})
export class RegisterModule { }
