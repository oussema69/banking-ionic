import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { LoadingController, Platform } from '@ionic/angular';
import { noop, Subscription } from 'rxjs';

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
  estimatesConverted:any = []
  incomesConverted:any=[]
  invoicesConverted:any = []
  orgmonth:any=[];
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
      console.log(res,'synthesis');

      await loading.dismiss();
      this.name = res.data.client.display_name;
      //totale estimation
      this.estimatesTotal = res.data.estimatesTotalConvertedSum;
      //total invoice
      this.invoicesTotal = res.data.invoicesTotalConvertedSum;
      // Received payments total
      this.incomesTotal = res.data.incomesTotalConvertedSum;
      //unpaid total
      this.unpaid = res.data.client.unpaid;
      //table of estimation
       this.estimatesConverted = res.data.estimatesConvertedSum;
    // this.estimatesConverted = [50, 50, 50, 50, 50, 0, 0, 0, 0, 0, 0, 0];
      console.log('estimate',this.estimatesConverted)
      /////
      //table payment
      this.incomesConverted = res.data.incomesConvertedSum;
      console.log('Received payments total',this.incomesConverted)
     // this.incomesConverted=[30, 50, 50, 50, 50, 0, 0, 0, 0, 0, 0, 0];
///categorie
for (const [akey, avalue] of Object.entries(res.data.organisedMonths  )) {
  this.orgmonth.push(avalue )
 
   
}

//table invoices
      this.invoicesConverted = res.data.invoicesConvertedSum;
      console.log('invoice',this.invoicesConverted)
      if(this.invoicesConverted == 0){
        this.invoicesConverted=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      if(this.estimatesConverted == 0){
        this.estimatesConverted=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      if(this.incomesConverted == 0){
        this.incomesConverted=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    //  this.invoicesConverted =[0, 10, 20, 30, 40, 40, 60, 0, 0, 0, 0, 0];
///
    
     
      this.options.series[0].data =  this.estimatesConverted;
      this.options.series[1].data = this.invoicesConverted;
      this.options.series[2].data = this.incomesConverted;
      Highcharts.chart('container', this.options);
      console.log('container',this.options)
    
       }, err => {
      console.log(err);
    });
  }

  public options: any = {
    chart: {
      type: 'column',
      height: 200,
    
    },
    scales: {
      xAxes: [{
      gridLines: {
      display:false
          },
      categoryPercentage: 1.0,
      barPercentage: 0.4,
      scaleLabel: {
          display: true,
          fontSize: 10,
          font: 'Georgia',
          labelString: 'service request',
          fontColor: '#808080',
          padding: 0
              }

            }],
          },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },

    xAxis: {
      categories:this.orgmonth

    },
    yAxis: {
      title: {
          text: ''
      }
  }, 
  legend: {
    symbolPadding: 0,
    symbolWidth: 0,
    symbolHeight: 0,
    squareSymbol: false
  },
    series: [
        {
          data: [],
          name:'', 
        },{
          name: '',
          data: []
        },{
          name: '',
          data: []
        }
      ],
      colors:[
        'blue',
        'green',
        'red'
      ],
   
  }

  goBack(){
    this.location.back()
  }

  
}
