import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';
@Pipe({
  name: 'niceDateFormatPipe',
})
export class NiceDateFormatPipe implements PipeTransform {
  REFERENCE = moment(); // fixed just for testing, use moment();
  TODAY = this.REFERENCE.clone().startOf('day');
  YESTERDAY = this.REFERENCE.clone().subtract(1, 'days').startOf('day');
  TOMORROW = this.REFERENCE.clone().add(1, 'days').startOf('day');
  A_WEEK_OLD = this.REFERENCE.clone().subtract(7, 'days').startOf('day')
  constructor(public datePipe: DatePipe) {
;
  }


  transform(value: string) {

     let date = moment(value);
     let day = '';
     if (this.isToday(date))
     {
       day = 'Today';
     }
     else if (this.isTomorrow(date))
     {
       day = 'Tomorrow';
     }
     else if (this.isYesterday(date))
     {
       day = 'Yesterday';
     }
     else {
      day = this.datePipe.transform(date, 'EEEE');
     };
     return day + ', ' + this.datePipe.transform(date, ' MM/dd/yy') + ' - ' + this.datePipe.transform(date, ' hh:mmaaaa');

  }

  isToday = (momentDate) => {
    return momentDate.isSame(this.TODAY, 'd');
  }

  isTomorrow = (someDate) => {
    return someDate.isSame(this.TOMORROW, 'd');
  }

  isYesterday = (someDate) => {
    return someDate.isSame(this.YESTERDAY, 'd');
  }
}
