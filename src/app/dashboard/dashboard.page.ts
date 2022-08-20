import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { LanguageService } from '../services/language.service';
import { LoadingController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements AfterViewInit, OnDestroy {
  acces_token = "";
  company_id = "";
  totalIncomes = 0;
  totalOutcomes = 0;
  totalBalance = 0;
  estimates: any;
  incomes : any;
  invoices: any;
  outcomes: any;
  estimatesSum = 0;
  incomesSum = 0;
  invoicesSum = 0;
  outcomesSum = 0;
  balance = 0;
  total = 0;
  sortedExpenseCategories: any;
  estimatesConverted: any;
  incomesConverted: any;
  invoicesConverted: any;
  companyName = "";
  name = "";
  subscription: Subscription;
  lang = ''

  constructor(private storage: Storage, 
              private router: Router, 
              private http: HttpService, 
              public loadingController: LoadingController,
              private languageService: LanguageService,
              private platform: Platform) {
                this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => { });
              }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }
  
  async ngAfterViewInit() {
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
    await this.storage.get('name').then((val: string) => {
      this.name = val;
    });

    Highcharts.chart('container', this.options_line);
    Highcharts.chart('container1', this.options_bar);

    console.log(this.acces_token);
    console.log(this.company_id);

    this.http.getDashbord('/company/'+this.company_id+'/dashboard', {}, this.lang, this.acces_token).subscribe(async (res: any) => {
      console.log(res);
      await loading.dismiss();
      // this.totalIncomes = res.data.totalIncomes;
      // this.totalOutcomes = res.data.totalOutcomes;
      // this.totalBalance = res.data.totalBalance;
      this.estimates = res.data.estimatesConvertedSum;
      this.incomes = res.data.incomesConvertedSum;
      this.invoices = res.data.invoicesConvertedSum;
      for(const prop in this.incomes)
        this.incomesSum+=this.incomes[prop];
      for(const prop in this.invoices)
        this.invoicesSum+=this.invoices[prop];
      for(const prop in this.estimates)
        this.estimatesSum+=this.estimates[prop];
      // this.companyName = res.data.company.title;
      this.http.getOptions('/company/'+this.company_id, this.lang, this.acces_token).subscribe((res:any) => {
        console.log(res);
        this.companyName = res.data.company.title;
      }, err => {
        console.log(err);
      });
      
      let index = [];
      let value = [];
      this.sortedExpenseCategories = res.data.sortedExpenseCategories;
      for(const prop in this.sortedExpenseCategories)
        index.push(prop);
      this.options_bar.xAxis.categories = index;
      for(const prop in this.sortedExpenseCategories)
        value.push(this.sortedExpenseCategories[prop]);
      this.options_bar.series[0].data = value;

      // this.estimatesConverted = res.data.estimatesConverted;
      // this.incomesConverted = res.data.incomesConverted;
      // this.invoicesConverted = res.data.invoicesConverted;
      let dataEstimates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let dataIncomes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let dataInvoices = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for(const prop in this.estimates)
        dataEstimates[+prop-1] = this.estimates[prop];
      for(const prop in this.incomes)
        dataIncomes[+prop-1] = this.incomes[prop];
      for(const prop in this.invoices)
        dataInvoices[+prop-1] = this.invoices[prop];
      this.options_line.series[0].data = dataEstimates;
      this.options_line.series[1].data = dataInvoices;
      this.options_line.series[2].data = dataIncomes;

      this.totalIncomes = res.data.totalIncomes;
      this.totalBalance = res.data.totalBalance;
      this.totalOutcomes = res.data.totalOutcomes;
      
      let chart_line = Highcharts.chart('container', this.options_line);
      let chart = Highcharts.chart('container1', this.options_bar);
      chart.setSize(260);
      chart_line.setSize(260);
    }, async err => {
      console.log('catch');
      await loading.dismiss();
      console.log(err);
    });
  }

  public options_line: any = {
    chart: {
      type: 'line',
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
      categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels:{
        style:{
          color: '#707070'
        }
      }
    },
    yAxis: {
      title: {
          text: ''
      }
  },
    series: [
        {
          name: 'Estimates',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          marker: {
            symbol: 'circle',
            width: 1,
            height: 1
          }
        },{
          name: 'Invoices',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          marker: {
            symbol: 'circle',
          }
        },{
          name: 'Received Payments',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          marker: {
            symbol: 'circle',
          }
        }
      ],
    colors:[
      '#1D2238',
      '#28AF6F',
      '#0E78E0'
    ]
  }

  public options_bar: any = {
    chart: {
      type: 'bar',
      height: 350,
      width: 310
    },
    title: {
      text: ''
    },
    xAxis: {
      categories:["Accounting Fees", "Advertising And Marketing", "Consultant Expense", "Credit Card Charges", "Services", "Telecommunication"],
      labels:{
        style:{
          color: '#707070',
          fontSize: '8'
        }
      }
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [
         {
            name: '',
            data: [0, 0, 0, 0, 0, 0]
         }
      ],
      colors:[
        '#0E78E0'
      ],
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
  }

  setDashboard(){
    if(this.lang == 'en'){
      this.options_line.series[0].name = 'Estimates';
      this.options_line.series[1].name = 'Invoices';
      this.options_line.series[2].name = 'Received Payments';
    }
    if(this.lang == 'fr'){
      this.options_line.series[0].name = 'Estimations';
      this.options_line.series[1].name = 'Factures';
      this.options_line.series[2].name = 'Paiements reçus';
    }
    if(this.lang == 'ar'){
      this.options_line.series[0].name = 'التقديرات';
      this.options_line.series[1].name = 'الفواتير';
      this.options_line.series[2].name = 'المدفوعات المستلمة';
    }
    
  }

  setLang(language: string){
    this.languageService.setLanguage(language);
    this.lang = language;
    this.setDashboard();
  }

}
