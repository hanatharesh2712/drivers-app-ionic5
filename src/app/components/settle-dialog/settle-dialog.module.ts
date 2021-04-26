import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SettleDialogComponent } from './settle-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [SettleDialogComponent],
  exports: [SettleDialogComponent],
  entryComponents: [SettleDialogComponent]
})
export class SettleDialogModule { }
