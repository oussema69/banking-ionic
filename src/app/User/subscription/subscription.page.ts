import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Location } from '@angular/common';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  subscriptionFree:any=[]
  subscriptionPremuim:any=[]
  formData: FormGroup;
  access_token = "";
  paymeeToken = "";
  startupprice="";
  label="";
  user:any=[]
  constructor(private http: HttpService,
    public renderer: Renderer2, 
    public loadingController: LoadingController,
              private router: Router,
              private storage: Storage,
              private location: Location,
              private iab: InAppBrowser,
             ) { }

  async ngOnInit() {
    this.formData = new FormGroup({
      type: new FormControl('1', [Validators.required]),
      plan: new FormControl('Dl', [Validators.required])
    });
    console.log(this.formData.value.type,'0')
    console.log(this.access_token);
   
    await this.storage.get('access_token').then(val => {
      this.access_token = val;
    });
    console.log('acces token',this.access_token)
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });

    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.http.SubscriptionLists('/user/subscription/list',  lang,this.access_token )
   .subscribe((res:any)=>{
    console.log(res.data.subscriptions
      ,'subscription')
    this.subscriptionFree=res.data.subscriptions[0]
    this. subscriptionPremuim=res.data.subscriptions[1]
    console.log(res)
    this.startupprice=this.subscriptionPremuim.yearly_price
    loading.dismiss();
   })   
  
  }
  changePrice(){
    if(this.formData.value.type == 1){
      
     
      this.startupprice=this.subscriptionPremuim.yearly_price
    }
    else{
    
      this.startupprice=this.subscriptionPremuim.monthly_price
    }
  }
  get type(){return this.formData.get('type')}
  get plan(){return this.formData.get('plan')}

 async onSubmit(){
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });
    let data: any = {
      type: this.type.value,
      quantity: 1,
      operation: 'Ev',
      country_id: 'Dl',
      discount: ''
    };
    if(this.type.value == 0){
      data.plan_month = this.plan.value;
      
    }
    else{
      data.plan_year = this.plan.value;
    }
    console.log(this.plan.value,'price')
    console.log(data);
    if(this.plan.value=='Dx'){
      this.router.navigate(['/new-company-page-one']);

    }
    console.log(this.plan.value,'price')

    this.http.newSubscription('/user/subscription/payment/go', data, lang, this.access_token).subscribe((res: any) => {
      console.log(res,'azhhhhhhhhhhhhhhhhhhhh');
console.log('plan value:' ,this.plan.value)
      if( this.plan.value == "Ev"){
        this.http.createPaymee(11).subscribe((res: any) => {
          console.log(res,'1');
          //this.router.navigate(['/new-company-page-one']);
          this.paymeeToken = res.data.token;
          const browser = this.iab.create('https://sandbox.paymee.tn/gateway/'+this.paymeeToken);
          browser.on('exit').subscribe(event => {
            this.http.checkPaymee(this.paymeeToken).subscribe((res: any) => {
              console.log(res,'2');
              let state = 'Ev';
              if(res.data.payment_status)
                state = 'Dx';
              let data = {
                state: state,
                token: this.paymeeToken,
                reference: res.data.transaction_id
              };
              this.http.subscriptionCallBack('/user/subscription/payment/'+state+'/callback', data, lang, this.access_token).subscribe((res: any) => {
                console.log(res,'3');
                this.router.navigate(['/new-company-page-one']);
              }, err => {
                console.log(err);
              })
            }, err => {
              console.log(err);
            });
         });
        }, err => {
          console.log(err);
        })
      }
      
    }, err => {
      console.log(err);
    });
  }

  async goBack(){
   
    
    // this.dashboardPage.ngOnInit()
    await this.storage.get('user').then((val: string) => {
      this.user = val;
    
    });
    console.log('userna',this.user)

      this.location.back();
   
    
  }

  setBorder(id: string){
    let lastChecked = new (ElementRef)(document.getElementById('free'));
    this.renderer.removeClass(lastChecked.nativeElement, 'input-border');
    lastChecked = new (ElementRef)(document.getElementById('startup'));
    this.renderer.removeClass(lastChecked.nativeElement, 'input-border');
    
    let checked = new (ElementRef)(document.getElementById(id));
    this.renderer.addClass(checked.nativeElement, 'input-border');
  }

}
