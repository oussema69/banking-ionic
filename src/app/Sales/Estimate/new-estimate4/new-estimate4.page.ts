import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-estimate4',
  templateUrl: './new-estimate4.page.html',
  styleUrls: ['./new-estimate4.page.scss'],
})
export class NewEstimate4Page implements OnInit {
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
    notes: '',
    items: []
  };
  unities: any = [];
  company_id = "";
  lang = "";
  acces_token = "";

  constructor(private router: Router, 
              private storage: Storage, 
              private http: HttpService, 
              public loadingController: LoadingController) { }

  async ngOnInit() {
    await this.storage.get('new-estimate').then(val => {
      this.form = val;
    });
    console.log('---form---');
    console.log(this.form);

    await this.storage.get('access_token').then(val => {
      this.acces_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
    });
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      this.lang = val;
    });

    this.http.getOptions('/general/items/unities', this.lang, this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.unities = res.data.unities;
    }, err => {
      console.log(err);
    });
  }

  async onSubmit(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
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
      dataSend.discount = +dataSend.discount;
      dataSend.items = itemsSend;
      this.http.saveEstimate('/company/'+this.company_id+'/sales/estimate/new', dataSend, this.lang, this.acces_token).subscribe(async (res: any) => {
        console.log(res);
        await loading.dismiss();
        this.router.navigate(['/menu/list-estimate']);
      }, err => {
        console.log(err);
      });
    }, 3000);
  }

}
