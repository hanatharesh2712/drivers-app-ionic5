import { DocumentsService } from '@app/services/documents.service';
import { PartnerDocument } from './../../models/document';
import { UtilService } from './../../services/util/util.service';
import { Component, Input, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { DocumentUploadDialogComponent } from '../document-upload-dialog/document-upload-dialog.component';

@Component({
  selector: 'document-item',
  templateUrl: './document-item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./document-item.component.scss']
})
export class DocumentItemComponent implements OnInit {
  uploading: boolean;
  @Input() document: PartnerDocument;
  @Output() onDocumentStatusChanged = new EventEmitter();
  constructor(
    public actionSheetController: ActionSheetController,
    private util: UtilService,
    private documentService: DocumentsService) { }

  ngOnInit() {
    if (!this.document.document)
    {
      this.document.document = {};
    }
  }


  async presentActionSheet() {
    if (!this.document.partner_document_type.has_file) {
      return;
    }
    if (!this.document.submitted) {
      this.openFileUploadDialog();
      return;
    }
    const actionSheet = await this.actionSheetController.create({
      header: 'Florida Driver License',
      cssClass: 'document-sheet',
      buttons: [
        {
          text: 'Download Document',
          icon: 'Download',
          handler: () => {
            window.open(this.document.document.file_path);
          }
        },
        {
          text: 'Remove Document',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.documentService.removeDocument(this.document.document.id).then(response =>
            {
              this.document.document = null;
              this.document.submitted = false;
              this.onDocumentStatusChanged.next(this.document);
            });
          }
        }
        , {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  async openFileUploadDialog() {
    const modal = await this.util.createModal(DocumentUploadDialogComponent,
      {}, 'document-upload-dialog');
    modal.present();
    modal.onDidDismiss().then(response => {
      if (response.data) {
        this.uploadFile({...response.data, document_type_id:  this.document.partner_document_type_id, entity_id: this.document.entity_id});
      }
    })
  }

  uploadFile(data): void {
    this.uploading = true;
    this.documentService.uploadDocument(data).then((response: any) => {
      if (response) {
        this.uploading = false;
        this.document.document = response.document;
        this.document.submitted = true;
        this.onDocumentStatusChanged.next();
      }
    },async (error) => {
      let alert = await this.util.createAlert(this.document.partner_document_type.document_name, true, "There was an error trying to"  + (data.answer ? 'save your answer' : "upload your document")  + ". Please try again.", {
        text: 'Ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async () => {

        }
      });
      alert.present();
      this.uploading = false;
    });
  }

  answerChanged(answer)
  {
    this.uploadFile({ document_type_id:  this.document.partner_document_type_id, answer: answer, entity_id: this.document.entity_id});
  }




}
