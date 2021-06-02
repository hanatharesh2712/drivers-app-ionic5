import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentUploadDialogComponent } from './document-upload-dialog.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [DocumentUploadDialogComponent],
  exports: [DocumentUploadDialogComponent],
  entryComponents: [DocumentUploadDialogComponent]
})
export class DocumentUploadDialogModule { }
