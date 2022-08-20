import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-company-page-one',
  templateUrl: './new-company-page-one.page.html',
  styleUrls: ['./new-company-page-one.page.scss'],
})
export class NewCompanyPageOnePage implements OnInit {
  formData: FormGroup;
  @ViewChild('inputFile') inputFile: HTMLButtonElement ;

  constructor(private storage: Storage, private router: Router, private location: Location) { }

  ngOnInit() {
    this.formData = new FormGroup({
      companyName : new FormControl('', Validators.required),
      pdfLang: new FormControl('en'),
      phoneNumber: new FormControl(''),
      webSite: new FormControl('')
    });
  }

  get companyName(){return this.formData.get('companyName')}
  get pdfLang(){return this.formData.get('pdfLang')}
  get phoneNumber(){return this.formData.get('phoneNumber')}
  get webSite(){return this.formData.get('webSite')}

  onSubmit(){
    let data = {
      title: this.companyName.value,
      language: this.pdfLang.value,
      phone: this.phoneNumber.value,
      website: this.webSite.value,
      country_id: '',
      bank: '',
      rib:'',
      bs: '',
      currency_id: '',
      address: '1 Taher Haded',
      state: 'tunis',
      zip_code: '2034',
      activity_id: '',
      fiscal_id: '',
      accounting_period_id: ''
    };
    this.storage.set('newCompany', data);
    this.router.navigate(['/new-company-page-two']);
  }

  openInputFile(){
    console.log(this.inputFile);
    
    // this.inputFile.nativeElement.click();
  }

  goBack(){
    this.location.back()
  }

}
