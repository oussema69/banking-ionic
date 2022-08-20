import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

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
  professional = "1";
  tax = "";

  constructor(private storage: Storage, private router: Router, private http: HttpService) { }

  async ngOnInit() {
    await this.storage.get('access_token').then(val => {
      this.access_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
    });

    this.http.getOptions('/general/currencies', 'en', this.access_token).subscribe((res: any) => {
      console.log(res);
      this.currencies = res.data.currencies;
      this.currencyDefault = this.currencies[138]
    }, err => {
      console.log(err);
    });

    this.http.getOptions('/general/activities', 'en', this.access_token).subscribe((res: any) => {
      console.log(res);
      this.activities = res.data.activities;
      this.activityDefault = this.activities[0];
    }, err => {
      console.log(err);
    });

    this.http.getOptions('/company/'+this.company_id+'/deadlines', 'en', this.access_token).subscribe((res: any) => {
      console.log(res);
      this.deadlines = res.data.invoiceDeadlines;
      this.deadlineDefault = this.deadlines[0];
    }, err => {
      console.log(err);
    });
  }

  async onSubmit(){
    let data: any;
    await this.storage.get('new-client').then(val => {
      data = val;
    });
    console.log(data);
    data.fiscal_id = this.tax;
    data.activity_id = this.activityDefault.hashed_id;
    data.currency_id = this.currencyDefault.hashed_id;
    data.deadline_id = this.deadlineDefault.hashed_id;
    this.storage.set('new-client', data);
    console.log(data);
    this.router.navigate(['/new-client-page-three']);
  }

}
