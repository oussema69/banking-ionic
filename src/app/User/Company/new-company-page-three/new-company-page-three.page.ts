import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-company-page-three',
  templateUrl: './new-company-page-three.page.html',
  styleUrls: ['./new-company-page-three.page.scss'],
})
export class NewCompanyPageThreePage implements OnInit {
  formData: FormGroup;
  accessToken = '';
  countries: any = [];
  countryDefault: any;

  constructor(private http: HttpService, private storage: Storage, private router: Router, private location: Location) { }

  async ngOnInit() {
    this.formData = new FormGroup({
      bank: new FormControl(''),
      bs: new FormControl(''),
      rib: new FormControl(''),
      country: new FormControl(this.countryDefault)
    });

    await this.storage.get('access_token').then(val => {
      this.accessToken = val;
    });

    this.http.getOptions('/general/countries', 'en', this.accessToken).subscribe((res: any) => {
      console.log(res);
      this.countries = res.data.countries;
      this.countryDefault = this.countries[234];
    }, err => {
      console.log(err);
    })
  }

  get bank(){return this.formData.get('bank')}
  get bs(){return this.formData.get('bs')}
  get rib(){return this.formData.get('rib')}
  get country(){return this.formData.get('country')}

  async onSubmit(){
    let data: any;
    await this.storage.get('newCompany').then(val => {
      data = val;
    });
    data.bank = this.bank.value;
    data.bs = this.bs.value;
    data.rib = this.rib.value;
    data.country_id = this.country.value.hashed_id;
    console.log(data);

    this.http.createCompany('/company/new', data, 'en', this.accessToken).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/menu/dashboard']);
    }, err => {
      console.log(err);
    });
  }

  goBack(){
    this.location.back()
  }

}
