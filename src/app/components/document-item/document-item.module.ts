import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentItemComponent } from './document-item.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [DocumentItemComponent],
  exports: [DocumentItemComponent]
})
export class DocumentItemModule { }
