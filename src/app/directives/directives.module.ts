
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegerInputDirective } from './integer-input';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IntegerInputDirective],
  exports: [IntegerInputDirective]
})
export class DirectivesModule { }
