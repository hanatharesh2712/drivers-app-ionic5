import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RideMapModule } from '../ride-map/ride-map.module';
import { RideMapDialogComponent } from './ride-map-dialog.component';

@NgModule({
  imports: [CommonModule, RideMapModule, IonicModule],
  declarations: [RideMapDialogComponent],
  exports: [RideMapDialogComponent],
  entryComponents: [RideMapDialogComponent],
})
export class RideMapDialogModule {}
