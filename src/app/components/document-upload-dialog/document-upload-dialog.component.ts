import {  ModalController } from '@ionic/angular';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

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
  fileChanged = new Subject();
  expirationDate;
  uploading: boolean;
  data;
  constructor(private cdRef: ChangeDetectorRef,
    private elRef: ElementRef,
    private modalController: ModalController) { }

  ngOnInit() {
    this.fileChanged.subscribe(e => {
      this.cdRef.detectChanges();
    })
  }
  uploadFile(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const extension = '.' + event.target.files[0].name.split('.').pop().toLowerCase();
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.data = {
          id: '',
          file_path: reader.result,
          file_ext: extension
        };
        this.documentUrl = reader.result.toString();
        this.fileChanged.next();
      };
    }
  }


  updateMyDate($event) {
    this.expirationDate = $event;
    console.log($event); // --> wil contains $event.day.value, $event.month.value and $event.year.value
  }

  confirmUpload() {
    this.uploading = true;
    setTimeout(() => {
      this.uploading = false;
      this.modalController.dismiss({...this.data, expiration_date: this.expirationDate});
    }, 3000);

  }
}
