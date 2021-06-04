import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DateTimeFormatPipe } from './datetime-format.pipe';
import { ReversePipe } from './reverse-pipe';
import { NiceDateFormatPipe } from './ride-date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NiceDateFormatPipe,
    DateTimeFormatPipe,
    ReversePipe
   ],
   exports: [
    NiceDateFormatPipe,
    DateTimeFormatPipe,
    ReversePipe
   ],
   providers: [DatePipe]
})
export class PipesModule { }
