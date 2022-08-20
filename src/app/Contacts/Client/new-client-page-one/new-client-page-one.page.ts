import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-client-page-one',
  templateUrl: './new-client-page-one.page.html',
  styleUrls: ['./new-client-page-one.page.scss'],
})
export class NewClientPageOnePage implements OnInit {
  acces_token = "";
  company_id = "";
  formData: FormGroup;
  currencies: any = [];
  currencyDefault: any;
  activities: any = [];
  activityDefault: any;
  deadlines: any = [];
  deadlineDefault: any;
  displayNameDefault1 = "";
  displayNameDefault2 = "";
  displayNameDefault3 = "";

  constructor(private storage: Storage, private router: Router, private http: HttpService) { }

  async ngOnInit() {
    this.formData = new FormGroup({
      title: new FormControl('1'),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      companyName: new FormControl(''),
      displayName: new FormControl('1', [Validators.required]),
      email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: new FormControl(''),
      webSite: new FormControl('', [Validators.pattern("(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+(?:\\.[\\w_-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?")]),
    });
  }

  get title(){return this.formData.get('title')}
  get firstName(){return this.formData.get('firstName')}
  get lastName(){return this.formData.get('lastName')}
  get companyName(){return this.formData.get('companyName')}
  get displayName(){return this.formData.get('displayName')}
  get email(){return this.formData.get('email')}
  get phone(){return this.formData.get('phone')}
  get webSite(){return this.formData.get('webSite')}

  onSubmit(){
    if(this.firstName.invalid || this.displayName.invalid)
      return null;
    
    let displayNameSend = this.displayName.value.substring(0,1);
    let dataSend = {
      first_name: this.firstName.value,
      last_name: this.lastName.value,
      company: this.companyName.value,
      display_name: displayNameSend,
      delivery_address: "",
      delivery_country: "",
      delivery_state: "",
      delivery_zip: "",
      bill_address: "",
      bill_country: "",
      bill_state: "",
      bill_zip: "",
      email: this.email.value,
      type: "1",
      fiscal_id: "",
      phone: this.phone.value,
      note: "",
      website: this.webSite.value,
      activity_id: "",
      currency_id: "",
      deadline_id: "",
      title: this.title.value
    };
    this.storage.set('new-client', dataSend);
    this.router.navigate(['/new-client-page-two']);
  }

  setDisplayName(){
    this.displayNameDefault1 = "";
    this.displayNameDefault2 = "";
    this.displayNameDefault3 = "";
    if(this.companyName.value != ""){
      this.displayNameDefault1 = "1"+this.companyName.value;
    } 
    if(this.firstName.value != "" && this.lastName.value != ""){
      this.displayNameDefault3 = "3"+this.lastName.value + ", " + this.firstName.value;
      this.displayNameDefault2 = "2"+this.firstName.value + " " + this.lastName.value;
    }else if(this.firstName.value != "" && this.lastName.value == ""){
      this.displayNameDefault2 = "2"+this.firstName.value;
    }else {
      this.displayNameDefault2 = "2"+this.lastName.value;
    }
  }

}
