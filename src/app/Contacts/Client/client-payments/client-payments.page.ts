import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-payments',
  templateUrl: './client-payments.page.html',
  styleUrls: ['./client-payments.page.scss'],
})
export class ClientPaymentsPage implements OnInit {

  payments: any = [];
  id = "";
  acces_token = "";
  company_id = "";
  lang = "";
name=""
Search=""
offset=0;
c:any =[];
  constructor(private storage: Storage, 
              private http: HttpService, 
              private route :ActivatedRoute, 
              public loadingController: LoadingController,
              private location: Location) { }

  async ngOnInit() {
  this.offset=0;
    this.id = this.route.snapshot.params[`id`];
    await this.storage.get('access_token').then(val => {
      this.acces_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
    });
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      this.lang = val;
    });
 
    await this.getClient(this.lang);
    await this.getPayment(this.lang);
  }
   async getPayment(lang:string){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.http.getOptions('/company/'+this.company_id+'/sales/payments/'+this.offset+'/10', this.lang, this.acces_token).subscribe(async (res: any) => {
    
      res.data.payments.map((payment: any) => {
        if(payment.hashed_contact_id == this.id)
          this.payments.push(payment);
      });
   
      for(let i of this.payments){
        this.c.push(i)
       }
       await loading.dismiss();

    }, err => {
      console.log(err);
    });
   }
  async getClient(lang:string){
    
    
      this.http.getOptions('/company/'+this.company_id+'/client/'+this.id+'/synthesis', lang, this.acces_token).subscribe(async (res: any) => {
      this.name=res.data.client.display_name
  
  
      }, err => {
        console.log(err);
      });
    
  }
  numTimesLeft = 10;  

  async loadData(event) {  
    setTimeout(() => {  
      this.offset=this.offset+1  
      this.getPayment(this.lang);
      this.numTimesLeft -= 1;  
      event.target.complete(); 
    }, 500);  

  }  
  goBack(){
    this.location.back()
  }

}
