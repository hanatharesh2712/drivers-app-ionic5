import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { niceDateFormatPipe } from '../date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    niceDateFormatPipe
   ],
   exports: [
    niceDateFormatPipe
   ],
   providers: [DatePipe]
})
export class PipesModule { }
