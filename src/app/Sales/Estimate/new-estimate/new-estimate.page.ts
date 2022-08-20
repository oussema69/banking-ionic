import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-new-estimate',
  templateUrl: './new-estimate.page.html',
  styleUrls: ['./new-estimate.page.scss'],
})
export class NewEstimatePage implements AfterViewInit {
  items: any = [];
  form = {
    lang: "",
    companyId: "",
    date: "",
    due: "",
    estimate_number: "",
    tax_type: 1,
    client_id: "",
    use_conditions: 0,
    show_stamp: 0,
    show_billing: 0,
    show_delivery: 0,
    show_bank: 0,
    bank_id: "",
    show_conditions: 0,
    show_description: 0,
    choice: 1,
    currency_rate: 1,
    language: "en",
    discount: "0",
    //items: this.items
    items: []
  };
  clients: any = [];
  clientDefault: any;
  clientSend: any;
  acces_token = "";
  company_id = "";
  taxes: any = [];
  taxeDefault: any;
  banks: any = [];
  unities: any = [];
  total = 0;
  subTotal = 0;
  showTax: any = [];
  lang = '';

  constructor(private storage: Storage, private router: Router, private http: HttpService) { }

  async ngAfterViewInit() {
    await this.storage.get('access_token').then(val => {
      this.acces_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
      this.form.companyId = val;
    });
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      this.lang = val;
    });
    this.form.lang = this.lang;

    this.http.getOptions('/company/'+this.company_id+'/client', this.lang, this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.clients = res.data.clients;
      this.clientDefault = this.clients[0];
    }, err => {
      console.log(err);
    });

    this.http.getOptions('/company/'+this.company_id+'/tax', this.lang, this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.taxes = res.data.taxes;
      this.taxeDefault = this.taxes[0];
      this.taxes.forEach((tax: any) => {
        this.showTax.push({
          hashed_id: tax.hashed_id,
          title: tax.title + ' (' + tax.rate + '%)',
          val: 0
        });
      })
    }, err => {
      console.log(err);
    });

    this.http.getOptions('/company/'+this.company_id+'/banks', this.lang, this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.banks = res.data.banks;
    }, err => {
      console.log(err);
    });

    this.http.getOptions('/general/items/unities', this.lang, this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.unities = res.data.unities;
    }, err => {
      console.log(err);
    });

    this.addItem();
  }

  addItem(){
    this.items.push({title: "",
                    description: "",
                    qty: "1",
                    up: "0",
                    Tax: [],
                    Price: 0,
                    discount: "0",
                    typeDiscount: "1"});
    this.addTax(this.items.length-1);
  }

  addTax(i: number){
    this.items[i].Tax.push(this.taxeDefault);
  }

  setPrice(i:number){
    this.form.items[i].Price = +this.form.items[i].qty * +this.form.items[i].up;
    if(this.form.items[i].typeDiscount == "1")
      this.form.items[i].Price -= (this.form.items[i].Price * +this.form.items[i].discount)/100;
    if(this.form.items[i].typeDiscount == "2")
      this.form.items[i].Price -= +this.form.items[i].discount;
  }

  setTotal(){
    this.total = 0;
    this.form.items.forEach((item: any) => {
      this.total += item.Price;
    }); 
    this.subTotal = this.total;
    this.form.items.forEach((item: any) => {
      item.Tax.forEach((tax: any) => {
        this.total += (tax.rate * item.Price)/100;
      });
    });
    this.total -= +this.form.discount;
  }

  setShowTax(){
    this.showTax.forEach((tax: any) => {
      tax.val = 0;
      this.form.items.forEach((item: any) => {
        item.Tax.forEach((taxItem: any) => {
          if(tax.hashed_id == taxItem.hashed_id)
            tax.val += (item.Price * taxItem.rate)/100;
        });
      });
    });
  }

  onSubmit1(){
    let dataSend = this.form;
    let itemsSend: any = [];
    dataSend.items.forEach((item: any) => {
      let taxSend: any = [];
      item.Tax.forEach((tax: any) => {
        taxSend.push({
          "tax_hashed_id": tax.hashed_id 
        });
      });
      let itemSend = {
        title: item.title,
        unity_id: this.unities[0].hashed_id,
        destination: "3",
        type: "1"
      };
      this.http.saveItem('/company/'+this.company_id+'/item/new', itemSend, this.lang, this.acces_token).subscribe((res: any) => {
        console.log(res);
        itemsSend.push(JSON.stringify({
          "item_hashed_id": res.data.item.hashed_id,
          "item": item.title,
          "description": "",
          "discountAmount": item.discount,
          "discountType": item.typeDiscount,
          "qte": +item.qty,
          "price": +item.up,
          "taxes": taxSend
        }));
      }, err => {
        console.log(err);
      })
    });
    
    setTimeout(() => {
      dataSend.bank_id = this.banks[0].hashed_id;
      dataSend.client_id = this.clientSend.hashed_id;
      dataSend.discount = dataSend.discount;
      dataSend.items = itemsSend;
      this.http.saveEstimate('/company/'+this.company_id+'/sales/estimate/new', dataSend, this.lang, this.acces_token).subscribe((res: any) => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    }, 3000);
  }

  onSubmit(){
    this.form.client_id = this.clientSend.hashed_id;
    this.storage.set('new-estimate', this.form);
    this.router.navigate(['/new-estimate2']);
  }

}
