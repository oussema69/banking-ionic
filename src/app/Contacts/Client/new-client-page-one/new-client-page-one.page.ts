import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { alertController } from '@ionic/core/dist/ionic/index.esm.js';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-client-page-one',
  templateUrl: './new-client-page-one.page.html',
  styleUrls: ['./new-client-page-one.page.scss'],
})
export class NewClientPageOnePage implements OnInit {
  @ViewChild('NameInput', {read: ElementRef}) NameInput: ElementRef;
  @ViewChild('PhoneInput', {read: ElementRef}) PhoneInput: ElementRef;
  @ViewChild('EmailInput', {read: ElementRef}) EmailInput: ElementRef;
  @ViewChild('WebInput', {read: ElementRef}) WebInput: ElementRef;

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

  constructor(private storage: Storage, private router: Router, private http: HttpService,
    private renderer: Renderer2,private location: Location) { }

  async ngOnInit() {
    this.formData = new FormGroup({
      title: new FormControl('1'),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      companyName: new FormControl(''),
      displayName: new FormControl('1', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: new FormControl('',[Validators.pattern("^[0-9]*$"),Validators.required,Validators.minLength(8)]),
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

  async onSubmit(){
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });
    if(this.firstName.invalid || this.displayName.invalid || this.email.invalid || this.webSite.invalid || this.phone.invalid){
     
      if(lang == 'en'){
        const alert = await alertController.create({
          header: 'Oops',
          message: 'must complete the form' ,
          buttons: ['Agree'],
        });
        await alert.present();
      }
      if(lang == 'fr'){
        const alert = await alertController.create({
          header: 'Oops',
          message: 'doit remplire le formulaire' ,
          buttons: ['Accepter'],
        });
        await alert.present();
      }
      if(lang == 'ar'){
        const alert = await alertController.create({
          header: 'Oops',
          message: 'يجب إكمال المعلومات' ,
          buttons: ['موافق'],
        });
        await alert.present();
      }
      return null;
    } else{
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
        type: "",
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
  validateName(){
    if(this.firstName.invalid){
      this.renderer.removeClass(this.NameInput.nativeElement, 'input-border-crr');
      this.renderer.addClass(this.NameInput.nativeElement, 'input-border-err');
    }else{
      this.renderer.removeClass(this.NameInput.nativeElement, 'input-border-err');
      this.renderer.addClass(this.NameInput.nativeElement, 'input-border-crr');
    }
  }
  validatePhone(){
    if(this.phone.invalid){
      this.renderer.removeClass(this.PhoneInput.nativeElement, 'input-border-crr');
      this.renderer.addClass(this.PhoneInput.nativeElement, 'input-border-err');
    }else{
      this.renderer.removeClass(this.PhoneInput.nativeElement, 'input-border-err');
      this.renderer.addClass(this.PhoneInput.nativeElement, 'input-border-crr');
    }
  }
  validateEmail(){
    if(this.email.invalid){
      this.renderer.removeClass(this.EmailInput.nativeElement, 'input-border-crr');
      this.renderer.addClass(this.EmailInput.nativeElement, 'input-border-err');
    }else{
      this.renderer.removeClass(this.EmailInput.nativeElement, 'input-border-err');
      this.renderer.addClass(this.EmailInput.nativeElement, 'input-border-crr');
    }
  }
  validateWeb(){
    if(this.webSite.invalid){
      this.renderer.removeClass(this.WebInput.nativeElement, 'input-border-crr');
      this.renderer.addClass(this.WebInput.nativeElement, 'input-border-err');
    }else{
      this.renderer.removeClass(this.WebInput.nativeElement, 'input-border-err');
      this.renderer.addClass(this.WebInput.nativeElement, 'input-border-crr');
    }
  }
  goBack(){
    this.location.back()
  }
}
