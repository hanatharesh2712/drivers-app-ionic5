import { DrvnAuthenticationService } from './../../../../services/auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PartnerVehicleDialogComponent } from '@app/components/partner-vehicle-dialog/partner-vehicle-dialog.component';
import { PartnerVehicleDialogModule } from '@app/components/partner-vehicle-dialog/partner-vehicle-dialog.module';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';
import { DocumentsService } from '@app/services/documents.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-registration-documents',
  templateUrl: './registration-documents.component.html',

  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./registration-documents.component.scss']
})
export class RegistrationDocumentsComponent implements OnInit {
  is_driver: boolean;
  loggedInUser: User;
  docs: any[];
  disableButton = false;

  constructor(
    private registrationService: RegistrationService,
    private authService: DrvnAuthenticationService,
    private docService: DocumentsService) {
    this.registrationService.setStep(5);
    this.docService.getDocuments().then((response: any) => {
      this.docs = response.documentTypes.filter(e => e.partner_document_type.required == 1);
      this.docs.forEach(element => {
        if (element.partner_document_type.type == 3)
        {
          element.entity_id = this.loggedInUser.partner.vehicles[0].id;
        }
      });
      this.checkValidation();
    })
  }

  ngOnInit() {

    this.loggedInUser = this.authService.currentUser;
    this.is_driver = this.loggedInUser.partner_type != 3;
  }

  nextStep() {
    this.registrationService.next();
  }

  back() {
    this.registrationService.back();
  }

  documentStatusChanged(doc)
  {
    this.checkValidation();
  }

  checkValidation()
  {
    this.disableButton =  this.docs.some(e => (e.partner_document_type.has_file && !e.submitted) || (!e.partner_document_type.has_file && !e.document.answer));
  }

}
