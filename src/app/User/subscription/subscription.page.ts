import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  formData: FormGroup;
  access_token = "";
  paymeeToken = "";

  constructor(private http: HttpService, 
              private router: Router,
              private storage: Storage,
              private location: Location,
              private iab: InAppBrowser,
              private renderer: Renderer2) { }

  async ngOnInit() {
    this.formData = new FormGroup({
      type: new FormControl('1', [Validators.required]),
      plan: new FormControl('Dl', [Validators.required])
    });
    console.log(this.access_token);

    await this.storage.get('access_token').then(val => {
      this.access_token = val;
    });
  }

  get type(){return this.formData.get('type')}
  get plan(){return this.formData.get('plan')}

  onSubmit(){
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
    console.log(data);
    this.http.newSubscription('/user/subscription/payment/go', data, 'en', this.access_token).subscribe((res: any) => {
      console.log(res);
      if(this.plan.value == "GZ" || this.plan.value == "Er"){
        this.http.createPaymee().subscribe((res: any) => {
          console.log(res);
          this.paymeeToken = res.data.token;
          const browser = this.iab.create('https://sandbox.paymee.tn/gateway/'+this.paymeeToken);
          browser.on('exit').subscribe(event => {
            this.http.checkPaymee(this.paymeeToken).subscribe((res: any) => {
              console.log(res);
              let state = 'Ev';
              if(res.data.payment_status)
                state = 'Dx';
              let data = {
                state: state,
                token: this.paymeeToken,
                reference: res.data.transaction_id
              };
              this.http.subscriptionCallBack('/user/subscription/payment/'+state+'/callback', data, 'en', this.access_token).subscribe((res: any) => {
                console.log(res);
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

  goBack(){
    // this.location.back()
  }

  setBorder(id: string){
    let lastChecked = new (ElementRef)(document.getElementById('free'));
    this.renderer.removeClass(lastChecked.nativeElement, 'input-border');
    lastChecked = new (ElementRef)(document.getElementById('startup'));
    this.renderer.removeClass(lastChecked.nativeElement, 'input-border');
    lastChecked = new (ElementRef)(document.getElementById('professional'));
    this.renderer.removeClass(lastChecked.nativeElement, 'input-border');
    let checked = new (ElementRef)(document.getElementById(id));
    this.renderer.addClass(checked.nativeElement, 'input-border');
  }

}
