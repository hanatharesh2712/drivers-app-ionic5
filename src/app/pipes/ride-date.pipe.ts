import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import parse from 'date-fns/parse'
@Pipe({
  name: 'niceDateFormatPipe',
})
export class NiceDateFormatPipe implements PipeTransform {

  constructor(public datePipe: DatePipe) {
  }


  transform(value: string) {

     let date = parse(value, 'MM/dd/yyyy HH:mm:ss', new Date());
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

  isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

  isTomorrow = (someDate) => {
    const today = new Date()
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return someDate.getDate() == tomorrow.getDate() &&
      someDate.getMonth() == tomorrow.getMonth() &&
      someDate.getFullYear() == tomorrow.getFullYear()
  }

  isYesterday = (someDate) => {
    const today = new Date()
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    return someDate.getDate() == yesterday.getDate() &&
      someDate.getMonth() == yesterday.getMonth() &&
      someDate.getFullYear() == yesterday.getFullYear()
  }
}
