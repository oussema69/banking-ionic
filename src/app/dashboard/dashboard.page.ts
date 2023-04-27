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
export class DashboardPage implements  AfterViewInit, OnDestroy {
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
 user:any =[]
 sub:boolean
 currentExerciseInvoices:any =[]
 estimatesConvertedSum:any=[]
 incomesConvertedSum:any= []
 dataEstimates:any=[];
 dataInvoices:any=[];
 dataIncomes:any = [];
 OrganizedMonth:any=[];
 series:any=[];
 estimatedtr=""
 invoicetr=""
 paymenttr=""
 cat2key:any=[];
 cat2value:any=[];
 chart1=""
 public options_bar: any
 public  options_line: any;
 
  constructor(private storage: Storage, 
              private router: Router, 
              private http: HttpService, 
              public loadingController: LoadingController,
              private languageService: LanguageService,
              private platform: Platform) {
                this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => { });
                platform.ready().then(() => {
             
                });     
              }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }
async  validateSubscription(){

  await this.storage.get('user').then((val: string) => {
      this.user = val;
    
    });
if('current_subscription' in this.user){
  return true
}else{
  this.router.navigate(['/subscription']);
}
if(this.company_id != null){
  return true
  }else{
        this.router.navigate(['/new-company-page-one']);

  }
  }
  async validateCompany(){
    if('joined_companies' in this.user || 'owned_companies' in this.user){
    return true
    }else{
          this.router.navigate(['/new-company-page-one']);

    }
  }
async  ngOnInit(){
  const loading = await this.loadingController.create({
    message: 'Please wait...'
  });
  await loading.present();
  let lang = '';

  await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
    lang = val;
  });

  
  await this.storage.get('access_token').then(val => {
    this.acces_token = val;
  });
  await this.storage.get('company_id').then(val => {
    this.company_id = val;
  });
 
  await this.storage.get('name').then((val: string) => {
    this.name = val;
  });
  await  this.validateSubscription();

//Highcharts.chart('container', this.options_line);
//Highcharts.chart('container1', this.options_bar);
  if(lang=='en'){
    this.estimatedtr='Estimates'
    this.invoicetr="Invoices"
    this.paymenttr="Received Payments"
  }
  if(lang=='fr'){
    this.estimatedtr='Estimations'
    this.invoicetr="Factures"
    this.paymenttr="Paiements reçus"
  }
  if(lang=='ar'){
    this.estimatedtr='التقديرات'
    this.invoicetr="الفواتير"
    this.paymenttr="المدفوعات المستلمة"
  }

this.http.getDashbord('/company/'+this.company_id+'/dashboard', {}, lang, this.acces_token).subscribe(async (res: any) => {
  console.log(res.data.company,'dashbording')  
  ///estimate converted sum table
  this.estimatesConvertedSum=res.data.estimatesConvertedSum
  ///income:paymnet table
  this.incomesConvertedSum=res.data.incomesConvertedSum
  //invoice current  to table of value
for (const [key, value] of Object.entries(res.data.currentExerciseInvoices)) {
  this.currentExerciseInvoices.push( value )
}
//months organized table
for (const [mkey, mvalue] of Object.entries(res.data.organisedMonths)) {
  this.OrganizedMonth.push( mvalue )
}
for (const [mkey, mvalue] of Object.entries(res.data.estimatesConvertedSum  )) {
  this.dataEstimates.push( mvalue )
}
for (const [mkey, mvalue] of Object.entries(res.data.incomesConvertedSum  )) {
  this.dataIncomes.push( mvalue )
}
for (const [akey, avalue] of Object.entries(res.data.sortedExpenseCategories  )) {
  this.cat2value.push(avalue )
  this.cat2key.push( akey);
   
}
console.log(this.cat2value[0],'values')

this.options_bar = {
  chart: {
    type: 'column',
    //styledMode: true,
    height: 200,
  },
  bar: {
    dataLabels: {
        enabled: true
    },
    pointWidth: 35,
    color: 'red'
},
plotOptions: {
  column: {
      borderRadius: 5,
      pointWidth:10
  }
},
   title: {
                  text: null
                },
                credits: {
                  enabled: false
                },
            
                xAxis: {
                  visible:false,
                  gridLineWidth: 0,
                  title: {
                    text: null,
                },
              
               
                 labels:{
                  enabled: false,
                  opposite: true,

                  style:{

                    color: 'white'
                  }
                }
                
                },
                yAxis: {
                  gridLineWidth: 0,
                title: {
                      text: null,
                  },
                  labels:{
                    enabled: false,

                    style:{

                      color: 'white'
                    }
                  }
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
                    fontColor: 'red',
                    padding: 0
                        }
          
                      }],
                    },
              legend: {
                symbolPadding: 20,
                symbolWidth: 0,
                symbolHeight: 0,
                squareSymbol: false
              },
              
              series: [
                {
                   name: '',
                   data: [{
                    name:this.cat2key[0],
                    color: '#1A8CFE',
                    width:20,
                    y: this.cat2value[0],
                    lineWidth: 20,
                    yAxis:12

                },
                {
                  name:this.cat2key[1],
                  color: '#0ACDFC',
                  y: this.cat2value[1]
              },
              {
                name:this.cat2key[2],

                color: '#00E6C3',
                y: this.cat2value[2]
            },
            {
              name:this.cat2key[3],

              color: '#39A9C4',
              y: this.cat2value[3]
          },
          {
            name:this.cat2key[4],

            color: '#94F73F',
            y: this.cat2value[4]
        },
        {
          name:this.cat2key[5],

          color: '#AFB507',
          y: this.cat2value[5]
      },
              ],
                },   
             ],
             
            
             
}

console.log('value', this.cat2value)
console.log('key',this.cat2key[0])
//this.dataIncomes = this.incomesConvertedSum
//this.dataInvoices =this.currentExerciseInvoices
console.log('orgmonth',this.OrganizedMonth)
console.log('estimates',this.incomesConvertedSum)
  await loading.dismiss();

  this.estimates = res.data.estimatesConvertedSum;
  this.incomes = res.data.incomesConvertedSum;
  if(this.estimates == 0){
    this;this.estimates=[0,0,0,0,0,0,0,0,0,0,0,0]
  }
  if(this.incomes == 0){
    this.incomes=[0,0,0,0,0,0,0,0,0,0,0,0]
  }
  this.invoices = res.data.invoicesConvertedSum;
  for(const prop in this.incomes)
    this.incomesSum+=this.incomes[prop];
  for(const prop in this.invoices)
    this.invoicesSum+=this.invoices[prop];
  for(const prop in this.estimates)
    this.estimatesSum+=this.estimates[prop];
  // this.companyName = res.data.company.title;
  ////////////////////////////////////////////////////

  this.http.getOptions('/company/'+this.company_id, lang, this.acces_token).subscribe((res:any) => {
    console.log(res,'aaaaaaaaaaaaaa');
    this.companyName = res.data.company.title;
  }, err => {
    console.log(err);
  });
  this.totalIncomes = res.data.totalIncomes;
  this.totalBalance = res.data.totalBalance;
  this.totalOutcomes = res.data.totalOutcomes;

  let chart_line = Highcharts.chart('container', this.options_line);
  let chart = Highcharts.chart('container1', this.options_bar);

  console.log('valueaaaaaaaaaa', this.chart1)

}, async err => {
  console.log('catch');
  //await loading.dismiss();
  console.log(err);
});


///////////////

     this.options_line = {
    
                  chart: {
                    type: 'line',
                    height: 200,
                  
                  },
                  scales: {
                    xAxes: [{
                    gridLines: {
                    display:false
                        },
                    categoryPercentage: 1.0,
                    barPercentage: 0.1,
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
                    categories:this.OrganizedMonth,
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
                      name:  this.estimatedtr,
                      data: this.dataEstimates,
                      marker: {
                        symbol: 'circle',
                        width: 1,
                        height: 1
                      }
                    },{
                      name: this.invoicetr,
                      data: this.currentExerciseInvoices,
                      marker: {
                        symbol: 'circle',
                      }
                    },{
                      name: this.paymenttr,
                      data:this.dataIncomes,
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

    ///////

            


  }
  async ngAfterViewInit() {
 

  }

 




  setLang(language: string){
    window.location.reload();
    this.languageService.setLanguage(language);
    
     ///series table values
 
  }
}
