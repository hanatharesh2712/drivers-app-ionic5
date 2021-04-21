import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideMapComponent } from './ride-map.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RideMapComponent],
  exports: [RideMapComponent]
})
export class RideMapModule { }
