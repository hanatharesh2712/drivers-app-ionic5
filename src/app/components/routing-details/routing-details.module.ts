import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingDetailsComponent } from './routing-details.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [RoutingDetailsComponent],
  exports: [RoutingDetailsComponent]
})
export class RoutingDetailsModule { }
