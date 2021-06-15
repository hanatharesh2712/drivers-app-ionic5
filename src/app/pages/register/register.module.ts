import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { IonicModule } from '@ionic/angular';
import { MobileValidationComponent } from './steps/mobile-validation/mobile-validation.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app/directives/directives.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { EmailValidationComponent } from './steps/email-validation/email-validation.component';
import { PartnerInformationComponent } from './steps/partner-information/partner-information.component';
import { ServiceInformationComponent } from './steps/service-information/service-information.component';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { VehicleInformationComponent } from './steps/vehicle-information/vehicle-information.component';
import { PartnerVehicleDialogModule } from '@app/components/partner-vehicle-dialog/partner-vehicle-dialog.module';
import { IonicStorageModule } from '@ionic/storage';
import { RegistrationDocumentsComponent } from './steps/registration-documents/registration-documents.component';
import { DocumentItemModule } from '@app/components/document-item/document-item.module';
import { RegistrationAgreementComponent } from './steps/registration-agreement/registration-agreement.component';
import { PaymentInformationComponent } from './steps/payment-information/payment-information.component';
import { VehicleService } from '@app/services/vehicle.service';
import { PipesModule } from '@app/pipes/pipes.module';
import { NotLoggedPagesGuard } from '@app/services/util/not-logged-pages.guard';
const routes: Routes = [
  {
    path: '',
    component: RegisterPageComponent,
    canActivate: [NotLoggedPagesGuard],
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
      {
        path: 'service-information',
        children: [
          {
            path: '',
            component: ServiceInformationComponent,
          }
        ]
      },
      {
        path: 'vehicle-information',
        children: [
          {
            path: '',
            component: VehicleInformationComponent,
          //  resolve: {
         //     data: VehicleService
          //  }
          }
        ]
      },
      {
        path: 'documents',
        children: [
          {
            path: '',
            component: RegistrationDocumentsComponent,
          }
        ]
      },
      {
        path: 'agreement',
        children: [
          {
            path: '',
            component: RegistrationAgreementComponent,
          }
        ]
      },
      {
        path: 'payment-information',
        children: [
          {
            path: '',
            component: PaymentInformationComponent,
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
    ReactiveFormsModule,
    NgOtpInputModule,
    IonicModule,
    DocumentItemModule,
    PipesModule,
    IonIntlTelInputModule,
    PartnerVehicleDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterPageComponent,
    MobileValidationComponent,
    EmailValidationComponent,
    PartnerInformationComponent,
    ServiceInformationComponent,

    RegistrationDocumentsComponent,
    RegistrationAgreementComponent,
    PaymentInformationComponent,
    VehicleInformationComponent]
})
export class RegisterModule { }
