import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user:any=[]
  sub_id=''
  logo:any
  companyManagementPages = [

  ];

  dashboard = {
    title: 'Dashboard',
    url: '/menu/dashboard'
  };

  contactsPages = [
   
  ];

  salesPages = [
 
  ];
  stock = [
 
  ];

  selectedPath = '';
  @ViewChild('iconeDashboard', {read: ElementRef}) iconeDashboard: ElementRef;
  name = "";
  companyList: any = [];
  companyId = "";
  companySelect: any;
  access_token = "";
  lang = "";
  photo="";
  srcPhoto="";

  constructor(private router: Router, private renderer: Renderer2, private storage: Storage, private http: HttpService) {
    

    this.router.events.subscribe((event: RouterEvent) => { 
      this.selectedPath = event.url;
      if(event.url == '/menu/dashboard')
        this.renderer.removeClass(this.iconeDashboard.nativeElement, 'icone-color'); 
      else
        this.renderer.addClass(this.iconeDashboard.nativeElement, 'icone-color');
    });
   }

  async ngOnInit() {
    ///companyManagment
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });
    if(lang == 'en'){
      this.companyManagementPages = [
        {
          title: 'Settings',
          url: '/menu/settings'
        },
        {
          title: 'Collaborators',
          url: '/menu/collaborators'
        },
        {
          title: 'Additional inputs',
          url: '/menu/additional-inputs'
        },
        {
          title: 'Taxes',
          url: '/menu/taxes'
        },
        {
          title: 'Banks',
          url: '/menu/banks'
        },
        {
          title: 'Customization',
          url: '/menu/customization'
        },
        {
          title: 'Calendar',
          url: '/menu/calendar'
        },
        {
          title: 'Logs',
          url: '/menu/logs'
        },
        {
          title: 'Files',
          url: '/menu/files'
        },
        {
          title: 'Reports',
          url: '/menu/reports'
        },
        {
          title: 'Integration',
          url: '/menu/integration'
        }
      ];
    }
   

      if(lang == 'fr'){
        this.companyManagementPages = [
          {
            title: 'Réglages',
            url: '/menu/settings'
          },
          {
            title: 'Collaborateurs',
            url: '/menu/collaborators'
          },
          {
            title: 'Entrées supplémentaires',
            url: '/menu/additional-inputs'
          },
          {
            title: 'Impôts',
            url: '/menu/taxes'
          },
          {
            title: 'Banques',
            url: '/menu/banks'
          },
          {
            title: 'Personnalisation',
            url: '/menu/customization'
          },
          {
            title: 'Calendrier',
            url: '/menu/calendar'
          },
          {
            title: 'Journaux',
            url: '/menu/logs'
          },
          {
            title: 'Des dossiers',
            url: '/menu/files'
          },
          {
            title: 'Rapports',
            url: '/menu/reports'
          },
          {
            title: 'Intégration',
            url: '/menu/integration'
          }
        ];
      }
      


  
    if(lang == 'ar'){
      this.companyManagementPages = [
        {
          title: 'إعدادات',
          url: '/menu/settings'
        },
        {
          title: 'المتعاونون',
          url: '/menu/collaborators'
        },
        {
          title: 'مدخلات إضافية',
          url: '/menu/additional-inputs'
        },
        {
          title: 'الضرائب',
          url: '/menu/taxes'
        },
        {
          title: 'البنوك',
          url: '/menu/banks'
        },
        {
          title: 'التخصيص',
          url: '/menu/customization'
        },
        {
          title: 'تقويم',
          url: '/menu/calendar'
        },
        {
          title: 'السجلات',
          url: '/menu/logs'
        },
        {
          title: 'الملفات',
          url: '/menu/files'
        },
        {
          title: 'التقارير',
          url: '/menu/reports'
        },
        {
          title: 'اندماج',
          url: '/menu/integration'
        }
      ];
    }
    /////
      ///contact

    if(lang == 'en'){
      this.contactsPages = [
        {
          title: 'Clients',
          url: '/menu/list-client'
        },
        {
          title: 'Providers',
          url: '/menu/provider'
        }
      ];
    }
   

    if(lang == 'fr'){
      this.contactsPages = [
        {
          title: 'Clients',
          url: '/menu/list-client'
        },
        {
          title: 'Fournisseurs',
          url: '/menu/provider'
        }
      ];
    }
    if(lang == 'ar'){
      this.contactsPages = [
        {
          title: 'العملاء',
          url: '/menu/list-client'
        },
        {
          title: 'الموفرون',
          url: '/menu/provider'
        }
      ];
    }
    /////
        /////
      ///sales

      if(lang == 'en'){
        this.salesPages = [
          {
            title: 'Delivery notes',
            url : '/menu/d'
          },
          {
            title: 'Exit vouchers',
            url : '/menu/e'
          },
          {
            title: 'Estimations',
            url : '/menu/list-estimate'
          },
          {
            title: 'Invoices',
            url : '/menu/e'
          },
          {
            title: 'Credit notes',
            url : '/menu/e'
          },
          {
            title: 'Disbursements notes',
            url : '/menu/e'
          },
          {
            title: 'Payments',
            url : '/menu/e'
          },
          {
            title: 'Reminders',
            url : '/menu/e'
          },
        ];
      }
     
  
      if(lang == 'fr'){
        this.salesPages = [
          {
            title: 'Bons de livraison',
            url : '/menu/d'
          },
          {
            title: 'Bons de sortie',
            url : '/menu/e'
          },
          {
            title: 'Estimations',
            url : '/menu/list-estimate'
          },
          {
            title: 'Factures',
            url : '/menu/e'
          },
          {
            title: 'Notes de crédit',
            url : '/menu/e'
          },
          {
            title: 'Notes de débours',
            url : '/menu/e'
          },
          {
            title: 'PaiementsPaiements',
            url : '/menu/e'
          },
          {
            title: 'Rappels',
            url : '/menu/e'
          },
        ];
      }
      if(lang == 'ar'){
        this.salesPages = [
          {
            title: 'مذكرات التسليم',
            url : '/menu/d'
          },
          {
            title: 'قسائم الخروج',
            url : '/menu/e'
          },
          {
            title: 'تقديرات',
            url : '/menu/list-estimate'
          },
          {
            title: 'الفواتير            ',
            url : '/menu/e'
          },
          {
            title: 'ملاحظات الائتمان',
            url : '/menu/e'
          },
          {
            title: 'ملاحظات الصرف',
            url : '/menu/e'
          },
          {
            title: 'المدفوعات',
            url : '/menu/e'
          },
          {
            title: 'تذكير',
            url : '/menu/e'
          },
        ];
      }
      /////
            ///stock

            if(lang == 'en'){
              this.stock = [
                {
                  title: 'Items',
                  url : '/menu/items'
                },
                {
                  title: 'Inventory',
                  url : '/menu/inventory'
                },
                {
                  title: 'Movements',
                  url : '/menu/movements'
                }
              ];
            
            }
           
        
            if(lang == 'fr'){
              this.stock = [
                {
                  title: 'Articles',
                  url : '/menu/items'
                },
                {
                  title: 'Inventaire',
                  url : '/menu/inventory'
                },
                {
                  title: 'Mouvements',
                  url : '/menu/movements'
                }
              ];
            }
            if(lang == 'ar'){
              this.stock = [
                {
                  title: 'العناصر',
                  url : '/menu/items'
                },
                {
                  title: 'جرد',
                  url : '/menu/inventory'
                },
                {
                  title: 'الحركات',
                  url : '/menu/movements'
                }
              ];
            }
            ///
    await this.storage.get('name').then((val: string) => {
      this.name = val;

    });
 

    await this.storage.get('company_id').then(val => {
      this.companyId = val;
    });
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      this.lang = val;
    });
    await this.storage.get('access_token').then((val: string) => {
      this.access_token = val;
    });
    await this.storage.get('user').then((val: string) => {
      this.user = val;
    
      this.sub_id=this.user.current_subscription.subscription_id
    });
    console.log('user image:::',this.user.photo )
    this.photo=this.user.photo
    this.srcPhoto="https://birou.tn/"+this.user.photo
    console.log('image',this.srcPhoto)
    await this.storage.get('company_list').then((val: any[]) => {

      let i = 0;
      val.map((company: any) => {
        i++;
        this.http.getOptions('/company/'+company.hashed_company_id, this.lang, this.access_token).subscribe((res: any) => {
         
          this.companyList.push({
            id: company.hashed_company_id,
            name: res.data.company.title
          });
        }, err => {
          console.log(err);
        });
      });

      this.companyList.map((company: any) => {
        if(company.hashed_company_id == this.companyId){
          this.companySelect = {
            id: company.id,
            name: company.name
          };
        }
      });
      console.log(this.companySelect);
    });
    // console.log('-----------');
    // console.log(this.companyList);
    // this.companyList.map((company: any) => {
    //   console.log('1');
    //   console.log(company.id," == ",this.companyId);
    //   if(company.id == this.companyId){
    //     console.log(company.id)
    //     this.companySelect = company;
    //   }
    // });
  }

  setCompany(event: any){
    this.storage.set('company_id', event.detail.value.id);
    console.log(this.selectedPath);
    this.router.navigate([this.selectedPath]);
  }

  async logout(){
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });
    this.http.logout('/user/logout', lang, this.access_token).subscribe((res: any) => {
      this.storage.set('user', null);
      
      this.router.navigate(['/login']);
     // window.location.reload()

    }, err => {
      console.log(err);
    });
  }
  async setlang(){
  //  this.ngOnInit()
  }



}
