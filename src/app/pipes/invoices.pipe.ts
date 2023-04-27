import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoices'
})
export class InvoicesPipe implements PipeTransform {

  transform(value: any[], Search: string): any {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
    }
    return  value.filter(p => (p.invoice_number?.toLowerCase().includes(Search)));
  }

}
