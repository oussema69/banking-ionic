import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.page.html',
  styleUrls: ['./edit-client.page.scss'],
})
export class EditClientPage implements OnInit {
  acces_token = '';
  company_id = '';
  lang = '';
  id = '';
  name = '';
  dataRes: any;
  client: any;
  formData: FormGroup;
  displayNameDefault1 = "";
  displayNameDefault2 = "";
  displayNameDefault3 = "";
  currencies: any = [];
  currencyDefault: any;
  activities: any = [];
  activityDefault: any;
  deadlines: any = [];
  deadlineDefault: any;

  constructor(private storage: Storage, 
              private http: HttpService, 
              private route :ActivatedRoute, 
              private router: Router,
              public loadingController: LoadingController) { }

  async ngOnInit() {
    this.id = this.route.snapshot.params[`id`];
    this.formData = new FormGroup({
      title: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      organisation: new FormControl(''),
      display_name: new FormControl(''),
      activity: new FormControl(this.activityDefault),
      currency: new FormControl(this.currencyDefault),
      deadline: new FormControl(this.deadlineDefault)
    });
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    await this.storage.get('access_token').then(val => {
      this.acces_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
    });
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      this.lang = val;
    });

    this.http.getOptions('/general/currencies', 'en', this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.currencies = res.data.currencies;
    }, err => {
      console.log(err);
    });

    this.http.getOptions('/general/activities', 'en', this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.activities = res.data.activities;
    }, err => {
      console.log(err);
    });

    this.http.getOptions('/company/'+this.company_id+'/deadlines', 'en', this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.deadlines = res.data.invoiceDeadlines;
      this.deadlineDefault = this.deadlines[0];
    }, err => {
      console.log(err);
    });

    setTimeout(() => {
      this.http.getOptions('/company/'+this.company_id+'/client', 'en', this.acces_token).subscribe(async (res: any) => {
        console.log(res);
        await loading.dismiss();
        res.data.clients.map((cl: any) => {
          if(cl.hashed_id == this.id){
            this.client = cl;
            this.name = cl.display_name;
          }
        });
        this.activities.map((activity: any) => {
          if(this.client.hashed_activity_id == activity.hashed_id)
            this.activityDefault = activity;
        });
        this.currencies.map((currency: any) => {
          if(this.client.hashed_currency_id == currency.hashed_id)
            this.currencyDefault = currency;
        });
        this.deadlines.map((deadline: any) => {
          if(this.client.hashed_default_invoice_deadline_id == deadline.hashed_id)
            this.deadlineDefault = deadline;
        });
        console.log(this.activityDefault);
        console.log(this.currencyDefault);
        console.log(this.deadlineDefault);
        for(const prop in this.formData.controls){
          this.formData.controls[prop].setValue(this.client[prop]);
        }
        this.setDisplayName();
        this.formData.controls['activity'].setValue(this.activityDefault);
        this.formData.controls['currency'].setValue(this.currencyDefault);
        this.formData.controls['deadline'].setValue(this.deadlineDefault);
      }, err => {
        console.log(err);
      });
    }, 1500);
  }

  get title() {return this.formData.get('title')}
  get first_name() {return this.formData.get('first_name')}
  get last_name() {return this.formData.get('last_name')}
  get organisation() {return this.formData.get('organisation')}
  get display_name() {return this.formData.get('display_name')}
  get activity() {return this.formData.get('activity')}
  get currency() {return this.formData.get('currency')}
  get deadline() { return this.formData.get('deadline')}  

  onSubmit(){
    let data = {
      title: this.title.value,
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      company: this.organisation.value,
      display_name: this.display_name.value,
      activity_id: this.activity.value.hashed_id,
      currency_id: this.currency.value.hashed_id,
      deadline_id: this.deadline.value.hashed_id
    };
    this.http.saveClient('/company/'+this.company_id+'/client/'+this.id+'/edit', data, 'en', this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/menu/list-client']);
    }, err => {
      console.log(err);
    })
  }

  setDisplayName(){
    this.displayNameDefault1 = "";
    this.displayNameDefault2 = "";
    this.displayNameDefault3 = "";
    if(this.organisation.value)
      this.displayNameDefault1 = this.organisation.value;
    if(this.first_name.value && this.last_name.value){
      this.displayNameDefault2 = this.first_name.value + " " + this.last_name.value;
      this.displayNameDefault3 = this.last_name.value + ", " + this.first_name.value; 
    } else if(this.first_name.value && !this.last_name.value){
      this.displayNameDefault2 = this.first_name.value;
    } else {
      this.displayNameDefault2 = this.last_name.value;
    }
  }

}
