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
  companyManagementPages = [
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

  dashboard = {
    title: 'Dashboard',
    url: '/menu/dashboard'
  };

  contactsPages = [
    {
      title: 'Cients',
      url: '/menu/list-client'
    },
    {
      title: 'Providers',
      url: '/menu/provider'
    }
  ];

  salesPages = [
    {
      title: 'Estimates',
      url : '/menu/list-estimate'
    }
  ];

  selectedPath = '';
  @ViewChild('iconeDashboard', {read: ElementRef}) iconeDashboard: ElementRef;
  name = "";
  companyList: any = [];
  companyId = "";
  companySelect: any;
  access_token = "";
  lang = "";

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
    await this.storage.get('company_list').then((val: any[]) => {

      let i = 0;
      val.map((company: any) => {
        i++;
        this.http.getOptions('/company/'+company.hashed_company_id, this.lang, this.access_token).subscribe((res: any) => {
          console.log(res);
          
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

  logout(){
    this.http.logout('/user/logout', 'en', this.access_token).subscribe((res: any) => {
      console.log(res);
      this.storage.set('user', null);
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }

  

}
