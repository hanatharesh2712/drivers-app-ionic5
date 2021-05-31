import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { niceDateFormatPipe } from './ride-date.pipe';
import { DateTimeFormatPipe } from './datetime-format.pipe';
import { ReversePipe } from './reverse-pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    niceDateFormatPipe,
    DateTimeFormatPipe,
    ReversePipe
   ],
   exports: [
    niceDateFormatPipe,
    DateTimeFormatPipe,
    ReversePipe
   ],
   providers: [DatePipe]
})
export class PipesModule { }
