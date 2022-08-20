import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-new-client-page-foor',
  templateUrl: './new-client-page-foor.page.html',
  styleUrls: ['./new-client-page-foor.page.scss'],
})
export class NewClientPageFoorPage implements OnInit {
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
    this.dataSend.delivery_address = this.address;
    this.dataSend.delivery_country = this.countrySend.hashed_id;
    this.dataSend.delivery_state = this.state;
    this.dataSend.delivery_zip = this.zipCode;
    console.log(this.dataSend);
    this.storage.set('new-client', this.dataSend);
    this.router.navigate(['/new-client-page-five']);
  }

}
