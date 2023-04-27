import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-invoices',
  templateUrl: './client-invoices.page.html',
  styleUrls: ['./client-invoices.page.scss'],
})
export class ClientInvoicesPage implements OnInit {

  invoices: any = [];
  id = "";
  acces_token = "";
  company_id = "";
  lang = "";
  Search=""
  offset=0;
  c:any=[]
  name=""
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
await this.getInvoices();
await this.getClient( this.lang)
  }
  async getInvoices(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.http.getOptions('/company/'+this.company_id+'/sales/invoices/'+this.offset+'/10', this.lang, this.acces_token).subscribe(async (res: any) => {
      console.log(res,'rrrrrrrrrrrrrrrrrr');
      res.data.invoices.map((invoice: any) => {
        if(invoice.hashed_contact_id == this.id)
          this.invoices.push(invoice);
          
      });
      for(let i of this.invoices){
        this.c.push(i)
       }
       await loading.dismiss();

        }, err => {
      console.log(err);
    })
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
      this.getInvoices();
      console.log('rr',this.offset)
      this.numTimesLeft -= 1;  
      event.target.complete();  
    }, 500);  

  }  
  goBack(){
    this.location.back()
  }
}
