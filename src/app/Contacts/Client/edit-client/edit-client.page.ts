import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { alertController } from '@ionic/core/dist/ionic/index.esm.js';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.page.html',
  styleUrls: ['./edit-client.page.scss'],
})
export class EditClientPage implements OnInit {
  @ViewChild('NameInput', {read: ElementRef}) NameInput: ElementRef;
  @ViewChild('PhoneInput', {read: ElementRef}) PhoneInput: ElementRef;
  @ViewChild('EmailInput', {read: ElementRef}) EmailInput: ElementRef;
  @ViewChild('WebInput', {read: ElementRef}) WebInput: ElementRef;
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
  countries: any=[];
  countryDefault: any;
  typeDefault:any;
  titleDefault: any;
  lastNameDefault: any;
  dispalyDefault:any;
  displayNameIndex:any;
  emailDefault: any;
  phoneDefault: any;
  webDefault: any;
  default_fiscal_id:any;
  defaultCountry:any;
  billing:any;
  billadressD:any;
  billcountryId:any;
  billstateD:any;
  billzipcodeD:any;
  delevery:any;
  deladressD:any;
  delcountryId:any;
  delstateD:any;
  delzipcodeD:any;
  DcountryD:any;
  noteD:any;
  constructor(private storage: Storage, 
              private http: HttpService, 
              private route :ActivatedRoute, 
              private router: Router,
              public loadingController: LoadingController,private renderer: Renderer2, 
              private location: Location) { }
  async ngOnInit() {
  
    this.id = this.route.snapshot.params[`id`];
    this.formData = new FormGroup({
      title: new FormControl(),
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl(this.lastNameDefault),

      organisation: new FormControl(''),
      display_name: new FormControl(),
      email:new FormControl(this.emailDefault,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      
      phone:new FormControl(this.phoneDefault,[Validators.pattern("^[0-9]*$"),Validators.required,Validators.minLength(8)]),
      activity: new FormControl(this.activityDefault),
      currency: new FormControl(this.currencyDefault),
      
      deadline: new FormControl(this.deadlineDefault),
      website: new FormControl(this.webDefault,[Validators.pattern("(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+(?:\\.[\\w_-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?")]),
      type:new FormControl(),
      
      fiscal_id:new FormControl(this.default_fiscal_id),
      Country:new FormControl(this.countryDefault),
      billadress:new FormControl(),
      
      billstate:new FormControl(),
      billzipcode:new FormControl(),
      DCountry:new FormControl(this.DcountryD),
      
      Dadress:new FormControl(),
      Dstate:new FormControl(),
      Dzipcode:new FormControl(),
      
      note:new FormControl()
    });
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
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
//work
    this.http.getOptions('/general/currencies', lang, this.acces_token).subscribe((res: any) => {
      this.currencies = res.data.currencies;
    }, err => {
      console.log(err);
    });
//work
    this.http.getOptions('/general/activities', lang, this.acces_token).subscribe((res: any) => {
      this.activities = res.data.activities;
    }, err => {
      console.log(err);
    });
//work

    this.http.getOptions('/company/'+this.company_id+'/deadlines', lang, this.acces_token).subscribe((res: any) => {
      this.deadlines = res.data.invoiceDeadlines;
    
    }, err => {
      console.log(err);
    });
    //
    this.http.getOptions('/general/countries', lang,this.acces_token).subscribe((res: any) => {
      this.countries = res.data.countries;
    }, err => {
      console.log(err);
    })
    ///blaset li na7ytha
    
  await  setTimeout(() => {
      this.http.getOptions('/company/'+this.company_id+'/client/'+this.id+'/synthesis', lang, this.acces_token).subscribe(async (res: any) => {
        await loading.dismiss();
         let cl:any
            this.client = res.data.client;
            cl=this.client
            this.name = cl.first_name;
            this.titleDefault=cl.title
            this.lastNameDefault=cl.last_name
            this.dispalyDefault=cl.display_name
            this.emailDefault=cl.email
            this.phoneDefault=cl.phone
            this.webDefault=cl.website
            this.typeDefault=cl.type
           this.default_fiscal_id=cl.default_fiscal_id
           ///string to json
           this.billing=JSON.parse(cl.billing);
           this.billadressD=this.billing.address
           this.billcountryId=this.billing.country_id
           this.billstateD=this.billing.bill_state
           this.billzipcodeD=this.billing.zip_code
           this.delevery=JSON.parse(cl.delivery);
           this.deladressD=this.delevery.address
           this.delcountryId=this.delevery.country_id
           this.delstateD=this.delevery.bill_state
           this.delzipcodeD=this.delevery.zip_code
            this.noteD=cl.note
       
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
        this.countries.map((country: any) => {
          if(this.billcountryId == country.hashed_id)
            this.countryDefault = country;
            
        });
        this.countries.map((country: any) => {
          if(this.delcountryId == country.hashed_id)
            this.DcountryD = country;
            
        });


        for(const prop in this.formData.controls){
          this.formData.controls[prop].setValue(this.client[prop]);
        }

        this.setDisplayName();
        this.formData.controls['activity'].setValue(this.activityDefault);
        this.formData.controls['currency'].setValue(this.currencyDefault);
        this.formData.controls['deadline'].setValue(this.deadlineDefault);
        this.formData.controls['title'].setValue(this.titleDefault.toString());
        this.formData.controls['type'].setValue(this.typeDefault.toString());
        this.formData.controls['billzipcode'].setValue(this.billzipcodeD);
        this.formData.controls['billadress'].setValue(this.billadressD);
        this.formData.controls['billstate'].setValue(this.billstateD);
//
        this.formData.controls['Dzipcode'].setValue(this.delzipcodeD);
        this.formData.controls['Dadress'].setValue(this.deladressD);
        this.formData.controls['Dstate'].setValue(this.delstateD);
        this.formData.controls['note'].setValue(this.noteD);


  


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
  get email() {return this.formData.get('email')}
  get phone() {return this.formData.get('phone')}
  get website() {return this.formData.get('website')}
  get type() {return this.formData.get('type')}
  get fiscal_id() {return this.formData.get('fiscal_id')}
  get Country() {return this.formData.get('Country')}
  get billadress() {return this.formData.get('billadress')}
  get billstate() {return this.formData.get('billstate')}
  get billzipcode() {return this.formData.get('billzipcode')}
  get Dadress() {return this.formData.get('Dadress')}
  get Dstate() {return this.formData.get('Dstate')}
  get Dzipcode() {return this.formData.get('Dzipcode')}
  get note() {return this.formData.get('note')}
  get DCountry() {return this.formData.get('DCountry')}






 async onSubmit(){
 
  let lang = '';
  await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
    lang = val;
  });
  if(this.first_name.invalid || this.display_name.invalid || this.email.invalid || this.website.invalid || this.phone.invalid){
   
    if(lang == 'en'){
      const alert = await alertController.create({
        header: 'Oops',
        message: 'verify your data' ,
        buttons: ['Agree'],
      });
      await alert.present();
    }
    if(lang == 'fr'){
      const alert = await alertController.create({
        header: 'Oops',
        message: 'verifier vos donées' ,
        buttons: ['Accepter'],
      });
      await alert.present();
    }
    if(lang == 'ar'){
      const alert = await alertController.create({
        header: 'Oops',
        message: 'تحقق من بياناتك' ,
        buttons: ['موافق'],
      });
      await alert.present();
    }
    return null;
  } else{
    let data = {
      title: this.title.value,
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      company: this.organisation.value,
      display_name:this.formData.value.display_name,
      activity_id: this.activity.value.hashed_id,
      currency_id: this.currency.value.hashed_id,
      deadline_id: this.deadline.value.hashed_id,

      delivery_address: this.Dadress.value,
      delivery_country:this.DCountry.value,
      delivery_state: this.Dstate.value,
      delivery_zip: this.Dzipcode.value,
      bill_address: this.billadress.value,
      bill_country: this.Country.value,
      bill_state: this.billstate.value,
      bill_zip: this.billzipcode.value,
      email: this.email.value,
      type: this.type.value,
      fiscal_id: this.fiscal_id.value,
      phone: this.phone.value,
      note: this.note.value,
      website: this.website.value,
    };
    this.http.saveClient('/company/'+this.company_id+'/client/'+this.id+'/edit', data,lang, this.acces_token).subscribe(async (res: any) => {
      
        if(res.status.code !=200){
          if(lang == 'en'){
            const alert = await alertController.create({
              header: 'Oops',
              message: res.status.message ,
              buttons: ['Agree'],
            });
            await alert.present();
          }
          if(lang == 'fr'){
            const alert = await alertController.create({
              header: 'Oops',
              message: res.status.message ,
              buttons: ['Accepter'],
            });
            await alert.present();
          }
          if(lang == 'ar'){
            const alert = await alertController.create({
              header: 'Oops',
              message: res.status.message ,
              buttons: ['اتفق'],
              
            });
            await alert.present();
          }
     
         }else{
          this.router.navigate(['/menu/dashboard']);

         }
  
    }, err => {
      console.log(err);
    })
  }

  }

  setDisplayName(){

    this.displayNameDefault1 = "";
    this.displayNameDefault2 = "";
    this.displayNameDefault3 = "";
    if(this.organisation.value)
      this.displayNameDefault1 = this.organisation.value;
      this.displayNameIndex='1'
    if(this.organisation.value){
      this.displayNameDefault2 = this.first_name.value + " " + this.last_name.value;
      this.displayNameDefault3 = this.last_name.value + ", " + this.first_name.value; 
    } else if(this.first_name.value && !this.last_name.value){
      this.displayNameDefault2 = this.first_name.value;
      this.displayNameIndex='2'
    } else {
      this.displayNameDefault2 = this.last_name.value;
      this.displayNameIndex='2'
    }
  }
  validateName(){
    if(this.first_name.invalid){
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
    if(this.website.invalid){
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
