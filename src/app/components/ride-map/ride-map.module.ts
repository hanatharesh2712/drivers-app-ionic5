import { ChildSeatDialogComponent } from './../child-seat-dialog/child-seat-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideMapComponent } from './ride-map.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule,
   IonicModule],
  declarations: [RideMapComponent, ChildSeatDialogComponent],
  exports: [RideMapComponent],
  entryComponents: [ChildSeatDialogComponent],
})
export class RideMapModule {}
