import { DatePipe } from '@angular/common';
import { Pipe, Injectable, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({ name: 'dateTime' })
@Injectable()
export class DateTimeFormatPipe implements PipeTransform {
  constructor(public datePipe: DatePipe) {}

  transform(date: any, format: string): any {
    if (date) {
     return this.datePipe.transform(moment(date), format);
    }
  }
}
