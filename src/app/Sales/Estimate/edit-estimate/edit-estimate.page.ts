import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-estimate',
  templateUrl: './edit-estimate.page.html',
  styleUrls: ['./edit-estimate.page.scss'],
})
export class EditEstimatePage implements OnInit {
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
    items: [],
    notes: ""
  };
  clients: any = [];
  clientDefault: any;
  clientSend: any;
  items: any = [];
  taxes: any = [];
  taxeDefault: any;
  total = 0;
  subTotal = 0;
  language = "en";

  constructor() { }

  ngOnInit() {
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

  onSubmit(){}

}
