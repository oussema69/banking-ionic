import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { LoadingController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-synthesis',
  templateUrl: './client-synthesis.page.html',
  styleUrls: ['./client-synthesis.page.scss'],
})
export class ClientSynthesisPage implements OnInit, OnDestroy {

  id = "";
  acces_token = "";
  company_id = "";
  lang = "";
  name = "";
  estimatesTotal = 0;
  invoicesTotal = 0;
  incomesTotal = 0;
  unpaid = 0;
  subscription: Subscription;

  constructor(private storage: Storage, 
              private http: HttpService, 
              private route :ActivatedRoute, 
              private location: Location, 
              public loadingController: LoadingController,
              private platform: Platform) { }

  ngOnDestroy(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => { });
  }

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
    this.http.getOptions('/company/'+this.company_id+'/client/'+this.id+'/synthesis', this.lang, this.acces_token).subscribe(async (res:any) => {
      console.log(res);
      await loading.dismiss();
      this.name = res.data.client.display_name;
      this.estimatesTotal = res.data.estimatesTotalConvertedSum;
      this.invoicesTotal = res.data.invoicesTotalConvertedSum;
      this.incomesTotal = res.data.incomesTotalConvertedSum;
      this.unpaid = res.data.client.unpaid;
      let estimatesConverted = res.data.estimatesConvertedSum;
      let incomesConverted = res.data.incomesConvertedSum;
      let invoicesConverted = res.data.invoicesConvertedSum;
      let dataEstimates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let dataIncomes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let dataInvoices = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for(const prop in estimatesConverted)
        dataEstimates[+prop-1] = estimatesConverted[prop];
      for(const prop in incomesConverted)
        dataIncomes[+prop-1] = incomesConverted[prop];
      for(const prop in invoicesConverted)
        dataInvoices[+prop-1] = invoicesConverted[prop];
      this.options.series[0].data = dataEstimates;
      this.options.series[1].data = dataInvoices;
      this.options.series[2].data = dataIncomes;
      Highcharts.chart('container', this.options);
    }, err => {
      console.log(err);
    });
  }

  public options: any = {
    chart: {
      type: 'column',
      height: 200,
      width: 310
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },

    xAxis: {
      categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    },
    series: [
        {
          name: 'Estimates',
          data: [10, 5, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0]
        },{
          name: 'Invoices',
          data: [10, 20, 30, 10, 2, 3, 1, 0, 0, 0, 0, 0]
        },{
          name: 'Received Payments',
          data: [10, 20, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
  }

  goBack(){
    this.location.back()
  }

}
