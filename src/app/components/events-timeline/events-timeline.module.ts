import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EventsTimeLineComponent } from './events-timeline.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [EventsTimeLineComponent],
  exports: [EventsTimeLineComponent]
})
export class EventsTimelineModule { }
