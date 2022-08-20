import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular/types/ionic-lifecycle-hooks';
import { Storage } from '@ionic/storage';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-new-estimate2',
  templateUrl: './new-estimate2.page.html',
  styleUrls: ['./new-estimate2.page.scss'],
})
export class NewEstimate2Page implements OnInit, ViewWillEnter {
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
    discount: 0,
    items: []
  };
  taxes: any = [];
  taxeDefault: any;
  showTax: any = [];
  unities: any = [];
  company_id = "";
  lang = "";
  acces_token = "";
  items: any = [];
  total = 0;
  subTotal = 0;

  constructor(private router: Router, private storage: Storage, private http: HttpService) { }

  async ionViewWillEnter(){
    await this.storage.get('new-estimate').then(val => {
      this.form = val;
    });
    console.log('---form---')
    console.log(this.form);
    this.form.items = this.items;
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

    this.http.getOptions('/general/items/unities', this.lang, this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.unities = res.data.unities;
    }, err => {
      console.log(err);
    });
  
    this.addItem();
  }
  
  async ngOnInit() {
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

  deleteItem(){
    this.items.pop();
  }

  addTax(i: number){
    this.items[i].Tax.push(this.taxeDefault);
  }

  deleteTax(i: number){
    this.items[i].Tax.pop();
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

  onSubmit(){
    this.form.items = this.items;
    this.storage.set('new-estimate', this.form);
    this.router.navigate(['/new-estimate3']);
  }

}
