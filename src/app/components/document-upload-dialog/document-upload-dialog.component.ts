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
        const data = {
          id: '',
          file_path: reader.result,
          file_ext: extension
        };
        this.documentUrl = reader.result.toString();
        this.fileChanged.next();

        // this.driverForm.controls['avatar_url'].markAsDirty();
        // need to run CD since file load runs outside of zone
        //  this.cdRef.detectChanges();
        // this.documentService._documentUploaded.next(data);
        // this.document.status = 'submitted';
        //  this.document.file_path = reader.result;

        //  this.documentService.uploadDocument(data).then((response: any) => {

        //      if (response) {
        //          this.uploading = false;
        //
        //          this.document.file_path = response.document.file_path;
        //          this.snackBar.open("Your document has been submitted.", 'OK', {
        //              verticalPosition: 'top',
        //              duration: 3000
        //          });
        //      }
        //  }, error => {
        //      this.snackBar.open("There was a problem when we tried to save the file. Please try again.", 'OK', {
        //          verticalPosition: 'top',
        //          panelClass: 'error-snackbar',
        //          duration: 3000
        //      });
        //      this.uploading = false;
        //  });
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
      this.modalController.dismiss(true);
    }, 3000);

  }
}
