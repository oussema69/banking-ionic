import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpService } from 'src/app/services/http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-company-page-two',
  templateUrl: './new-company-page-two.page.html',
  styleUrls: ['./new-company-page-two.page.scss'],
})
export class NewCompanyPageTwoPage implements OnInit {
  formData: FormGroup;
  currencies: any = [];
  currencyDefault: any;
  accessToken = '';
  activities: any = [];
  activityDefault: any;
  accounting: any = [];
  accountDefault: any;

  constructor(private storage: Storage, private http: HttpService, private router: Router, private location: Location) { }

  async ngOnInit() {
    this.formData = new FormGroup({
      activity: new FormControl(this.activityDefault),
      tax: new FormControl(''),
      exercice: new FormControl(this.accountDefault),
      currency: new FormControl(this.currencyDefault)
    });

    await this.storage.get('access_token').then(val => {
      this.accessToken = val;
    });

    this.http.getOptions('/general/currencies', 'en', this.accessToken).subscribe((res: any) => {
      console.log(res);
      this.currencies = res.data.currencies;
      this.currencyDefault = this.currencies[138];
    }, err => {
      console.log(err);
    });

    this.http.getOptions('/general/activities', 'en', this.accessToken).subscribe((res: any) => {
      console.log(res);
      this.activities = res.data.activities;
      this.activityDefault = this.activities[0];
    }, err => {
      console.log(err);
    });

    this.http.getOptions('/general/accounting', 'en', this.accessToken).subscribe((res: any) => {
      console.log(res);
      this.accounting = res.data.accountingPeriods;
      this.accountDefault = this.accounting[0];
    }, err => {
      console.log(err);
    });
  }

  get activity(){return this.formData.get('activity')}
  get tax(){return this.formData.get('tax')}
  get exercice(){return this.formData.get('exercice')}
  get currency(){return this.formData.get('currency')}

  async onSubmit(){
    let data: any;
    await this.storage.get('newCompany').then(val => {
      data = val;
    });
    data.activity_id = this.activity.value.hashed_id;
    data.currency_id = this.currency.value.hashed_id;
    data.accounting_period_id = this.exercice.value.hashed_id;
    data.fiscal_id = this.tax.value;
    console.log(this.tax.value);
    console.log(data);
    this.storage.set('newCompany', data)
    this.router.navigate(['/new-company-page-three']);
  }

  goBack(){
    this.location.back()
  }

}
