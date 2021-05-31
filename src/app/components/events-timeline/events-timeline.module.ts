import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EventsTimeLineComponent } from './events-timeline.component';
import { PipesModule } from '@app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  declarations: [EventsTimeLineComponent],
  exports: [EventsTimeLineComponent]
})
export class EventsTimelineModule { }
