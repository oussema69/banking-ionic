import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-new-estimate3',
  templateUrl: './new-estimate3.page.html',
  styleUrls: ['./new-estimate3.page.scss'],
})
export class NewEstimate3Page implements OnInit {
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

  language = "en";
  banks: any = [];
  bankDefault: any;
  acces_token = "";
  company_id = "";
  lang = "";

  constructor(private router: Router, private storage: Storage, private http: HttpService) { }

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
      this.form.companyId = val;
    });
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      this.lang = val;
    });

    this.http.getOptions('/company/'+this.company_id+'/banks', this.lang, this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.banks = res.data.banks;
      this.bankDefault = this.banks[0];
    }, err => {
      console.log(err);
    });
  }

  onSubmit(){
    this.form.bank_id = this.bankDefault.hashed_id;
    this.form.language = this.lang;
    this.storage.set('new-estimate', this.form);
    this.router.navigate(['/new-estimate4']);
  }

}
