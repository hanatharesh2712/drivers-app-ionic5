
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegerInputDirective } from './integer-input';
import { GooglePlacesDirective } from './google-places.directive';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [	IntegerInputDirective,
      GooglePlacesDirective
   ],
  exports: [IntegerInputDirective, GooglePlacesDirective]
})
export class DirectivesModule { }
