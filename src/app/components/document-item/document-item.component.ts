import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'document-item',
  templateUrl: './document-item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./document-item.component.scss']
})
export class DocumentItemComponent implements OnInit {
  uploading: boolean;
  @ViewChild('fileInput', { static: true }) fileInput;
  submitted = false;

  constructor(public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }


  async presentActionSheet() {
    let buttons: any[] = [];
    if (this.submitted) {
      buttons.push({
        text: 'Download Document',
        icon: 'Download',
        handler: () => {
          console.log('Play clicked');
        }
      },
        {
          text: 'Remove Document',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.submitted = false;
          }
        }

      )
    }
    else {
      buttons.push(
        {
          text: 'Upload Document',
          role: 'destructive',
          icon: 'cloud-upload-outline',
          handler: () => {
            this.fileInput.nativeElement.click();
          }
        })
    }
    const actionSheet = await this.actionSheetController.create({
      header: 'Florida Driver License',
      cssClass: 'document-sheet',
      buttons: [
        ...buttons, {
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



  uploadFile(event): void {
    this.uploading = true;
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
        // this.avatarUrl = reader.result.toString();
        // this.driverForm.controls['avatar_url'].markAsDirty();
        // need to run CD since file load runs outside of zone
        //  this.cdRef.detectChanges();
        // this.documentService._documentUploaded.next(data);
        // this.document.status = 'submitted';
        //  this.document.file_path = reader.result;
        setTimeout(() => {
          this.uploading = false;
          this.submitted = true;
        }, 3000);

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


}
