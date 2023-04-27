import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-client-page-two',
  templateUrl: './new-client-page-two.page.html',
  styleUrls: ['./new-client-page-two.page.scss'],
})
export class NewClientPageTwoPage implements OnInit {
  access_token = "";
  company_id = "";
  currencies: any = [];
  currencyDefault: any;
  activities: any = [];
  activityDefault: any;
  deadlines: any = [];
  deadlineDefault: any;
  

  constructor(private storage: Storage, private router: Router, private http: HttpService
    ,private location: Location,public loadingController: LoadingController,) { }
  formData: FormGroup;
  async ngOnInit() {
    this.formData = new FormGroup({
      type: new FormControl('1'),
      tax: new FormControl(''),
      activity: new FormControl(this.activityDefault),
      currency:new FormControl(this.currencyDefault),
      deadline:new FormControl(this.deadlineDefault),
    });
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });
    await this.storage.get('access_token').then(val => {
      this.access_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
    });

    this.http.getOptions('/general/currencies', lang, this.access_token).subscribe((res: any) => {
      this.currencies = res.data.currencies;
      this.currencyDefault = this.currencies[138]
    }, err => {
      console.log(err);
    });

    this.http.getOptions('/general/activities', lang, this.access_token).subscribe((res: any) => {
      this.activities = res.data.activities;
      this.activityDefault = this.activities[0];
    }, err => {
      console.log(err);
    });

    this.http.getOptions('/company/'+this.company_id+'/deadlines', lang, this.access_token).subscribe(async (res: any) => {
      this.deadlines = res.data.invoiceDeadlines;
      this.deadlineDefault = this.deadlines[0];
      await loading.dismiss();
    }, err => {
      console.log(err);
    });
  }
  get type(){return this.formData.get('type')}
  get tax(){return this.formData.get('tax')}
  get activity(){return this.formData.get('activity')}
  get currency(){return this.formData.get('currency')}
  get deadline(){return this.formData.get('deadline')}
  

  async onSubmit(){
    let data: any;
    await this.storage.get('new-client').then(val => {
      data = val;
    });
    data.fiscal_id = this.tax.value;
    data.activity_id = this.activity.value.hashed_id;
    data.currency_id = this.currency.value.hashed_id;
    data.deadline_id = this.deadline.value.hashed_id;
    data.type=this.type.value
    this.storage.set('new-client', data);
    this.router.navigate(['/new-client-page-three']);
  }
  goBack(){
    this.location.back()
  }
}
