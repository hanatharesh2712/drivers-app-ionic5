import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { niceDateFormatPipe } from '../ride-date.pipe';
import { DateTimeFormatPipe } from '../datetime-format.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    niceDateFormatPipe,
    DateTimeFormatPipe
   ],
   exports: [
    niceDateFormatPipe,
    DateTimeFormatPipe
   ],
   providers: [DatePipe]
})
export class PipesModule { }
