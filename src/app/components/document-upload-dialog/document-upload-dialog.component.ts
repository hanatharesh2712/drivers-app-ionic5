import {  ModalController } from '@ionic/angular';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { PartnerDocumentType } from '@app/models/document';
import * as moment from 'moment';

@Component({
  selector: 'app-document-upload-dialog',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './document-upload-dialog.component.html',
  styleUrls: ['./document-upload-dialog.component.scss']
})
export class DocumentUploadDialogComponent implements OnInit {

  @ViewChild('fileInput', { static: true }) fileInput;
  file = false;
  documentUrl = "";
  expirationDate;
  uploading: boolean;
  data;
  documentType: PartnerDocumentType;
  invalidMessage: string;
  acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf', 'image/gif'];
  now: any;
  constructor(
    private modalController: ModalController) {
      this.now = moment().toISOString();
    }

  ngOnInit() {

  }

  uploadFile(event): void {
    const reader = new FileReader();
    this.invalidMessage = '';
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      if ((file.size/1024/1024) > 10)
      {
        this.invalidMessage = 'File size exceeded. Max file size allowed: 10Mb.'
        return;
      }
      if (!this.acceptedTypes.includes(file.type))
      {
        this.invalidMessage = 'File format invalid. Allowed formats: .PNG, .JPG, .JPEG, .PDF'
        return;
      }
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.data = {
          id: '',
          file_path: reader.result,
          file_ext: extension
        };
        this.documentUrl = reader.result.toString();
      };
    }
  }


  updateMyDate($event) {
    this.expirationDate = $event;
    console.log($event); // --> wil contains $event.day.value, $event.month.value and $event.year.value
  }

  confirmUpload() {
    this.modalController.dismiss({...this.data, expiration_date: this.expirationDate});
  }


  dismiss() {
    this.modalController.dismiss(false);
  }
}
