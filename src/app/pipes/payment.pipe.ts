import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payment'
})
export class PaymentPipe implements PipeTransform {

 
  transform(value: any[], Search: string): any {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
    }
    return  value.filter(p => (p.payment_number?.toLowerCase().includes(Search)));
  }

}
