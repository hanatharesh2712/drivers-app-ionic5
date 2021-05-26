import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerVehicleDialogComponent } from './partner-vehicle-dialog.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [PartnerVehicleDialogComponent],
  exports: [PartnerVehicleDialogComponent],
  entryComponents: [PartnerVehicleDialogComponent]
})
export class PartnerVehicleDialogModule { }
