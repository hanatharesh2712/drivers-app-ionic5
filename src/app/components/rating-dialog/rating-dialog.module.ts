import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingDialogComponent } from './rating-dialog.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [RatingDialogComponent],

  exports: [RatingDialogComponent],
  entryComponents: [RatingDialogComponent]
})
export class RatingDialogModule { }
