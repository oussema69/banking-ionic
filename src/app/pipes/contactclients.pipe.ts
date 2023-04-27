import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactclients'
})
export class ContactclientsPipe implements PipeTransform {

  transform(value: any[], Search: string): any {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
    }
    return  value.filter(p => (p.first_name?.toLowerCase().includes(Search)));
  }

}
