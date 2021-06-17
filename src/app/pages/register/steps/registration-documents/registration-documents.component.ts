import { DrvnAuthenticationService } from './../../../../services/auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PartnerVehicleDialogComponent } from '@app/components/partner-vehicle-dialog/partner-vehicle-dialog.component';
import { PartnerVehicleDialogModule } from '@app/components/partner-vehicle-dialog/partner-vehicle-dialog.module';
import { RegistrationService } from '@app/services/registration.service';
import { UtilService } from '@app/services/util/util.service';
import { DocumentsService } from '@app/services/documents.service';
import { User } from '@app/models/user';
import { PartnerDocumentType } from '@app/models/document';

@Component({
  selector: 'app-registration-documents',
  templateUrl: './registration-documents.component.html',

  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./registration-documents.component.scss']
})
export class RegistrationDocumentsComponent implements OnInit {
  is_driver: boolean;
  loggedInUser: User;
  docsTypes: PartnerDocumentType[];
  disableButton = false;
  partnerDocs: PartnerDocumentType[] = [];
  vehicleDocs: PartnerDocumentType[] = [];
  driverDocs: PartnerDocumentType[] = [];
  constructor(
    private registrationService: RegistrationService,
    private authService: DrvnAuthenticationService,
    private docService: DocumentsService) {
    this.registrationService.setStep(5);
    this.docService.getDocuments().then((response: any) => {
      this.docsTypes = response.filter(e => e.required == 1).map(e => {
        if (e.type == 3) {
          e.entity_id = this.loggedInUser.partner.vehicles[0] ? this.loggedInUser.partner.vehicles[0].id : null;
        }
        return e;
      });

      this.partnerDocs = this.filterDocs(1);
      this.vehicleDocs = this.filterDocs(2);
      this.driverDocs = this.filterDocs(3);
      this.checkValidation();
    })
  }

  filterDocs(type) {
    return this.docsTypes.filter(e => e.type == type);
  }

  ngOnInit() {

    this.loggedInUser = this.authService.currentUser;
    this.is_driver = this.loggedInUser.partner_type != 3;
  }

  nextStep() {
    this.docService.needDocuments = false;
    this.registrationService.next();
  }

  back() {
    this.registrationService.back();
  }

  documentStatusChanged(doc) {
    this.checkValidation();
  }

  checkValidation() {
    this.disableButton = this.docService.cheeckNeededDocument(this.docsTypes);
  }

}
