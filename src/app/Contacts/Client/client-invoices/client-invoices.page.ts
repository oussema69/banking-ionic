import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

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

  constructor(private storage: Storage, 
              private http: HttpService, 
              private route :ActivatedRoute, 
              public loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
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
    this.http.getOptions('/company/'+this.company_id+'/sales/invoice', this.lang, this.acces_token).subscribe(async (res: any) => {
      console.log(res);
      await loading.dismiss();
      res.data.invoices.map((invoice: any) => {
        if(invoice.hashed_contact_id == this.id)
          this.invoices.push(invoice);
      });
    }, err => {
      console.log(err);
    })
  }

  openPopover(ev, id, i){}

}
