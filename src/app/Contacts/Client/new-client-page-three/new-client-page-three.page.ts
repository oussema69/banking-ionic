import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-new-client-page-three',
  templateUrl: './new-client-page-three.page.html',
  styleUrls: ['./new-client-page-three.page.scss'],
})
export class NewClientPageThreePage implements OnInit {
  dataSend: any;
  access_token = "";
  company_id = "";
  address = "";
  state = "";
  zipCode = "";
  countries: any = []
  countryDefault: any;
  countrySend: any;

  constructor(private storage: Storage, private router: Router, private http: HttpService) { }

  async ngOnInit() {
    await this.storage.get('access_token').then(val => {
      this.access_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
    });

    this.http.getOptions('/general/countries', 'en', this.access_token).subscribe((res: any) => {
      console.log(res);
      this.countries = res.data.countries;
      this.countryDefault = this.countries[234];
    }, err => {
      console.log(err);
    })

    await this.storage.get('new-client').then(val => {
      this.dataSend = val;
    });
  }

  onSubmit(){
    this.dataSend.bill_address = this.address;
    this.dataSend.bill_country = this.countrySend.hashed_id;
    this.dataSend.bill_state = this.state;
    this.dataSend.bill_zip = this.zipCode;
    console.log(this.dataSend);
    this.storage.set('new-client', this.dataSend);
    this.router.navigate(['/new-client-page-foor']);
    // this.http.saveClient('/company/'+this.company_id+'/client/new', this.dataSend, 'en', this.access_token).subscribe((res: any) => {
    //   console.log(res);
    // }, err => {
    //   console.log(err);
    // })
  }

}
