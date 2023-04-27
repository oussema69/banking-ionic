import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, Platform, PopoverController, ViewWillEnter } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpService } from 'src/app/services/http.service';
import { ClientPopoverPage } from '../client-popover/client-popover.page';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.page.html',
  styleUrls: ['./list-contact.page.scss'],
})
export class ListClientPage implements OnInit, OnDestroy, ViewWillEnter {
  acces_token = '';
  company_id = '';
  clients: any = [];
  Search:string=""
  subscription: Subscription;
  c:any= [];
user:any=[];
  offset:number=0;
  constructor(private storage: Storage, 
              private http: HttpService, 
              private popoverCtrl: PopoverController, 
              public loadingController: LoadingController,
              private renderer: Renderer2,
              private router: Router,
              private platform: Platform) { this.addMoreItems(); }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

  ionViewWillEnter(){
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => { });
  }

  async ngOnInit() {
    await this.storage.get('user').then((val: string) => {
      this.user = val;
    
    });
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
    this.getClients();
    await loading.dismiss();
    this.generateItems();

  }
  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }
  async function(){
    this.offset=this.offset+1;
  }
  onIonInfinite(ev) {
  }
  async getClients(){
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });
  
    this.http.getOptions('/company/'+this.company_id+'/clients/'+this.offset+'/10', lang, this.acces_token).subscribe((res: any) => {
      this.clients = res.data.clients
      ;
      
   for(let i of this.clients){
    this.c.push(i)
    console.log('i : ',i.currency.iso_code)     
    

   }
console.log('this',this.c)      

    }, err => {
      console.log(err);
    });
  }

  async openPopover(ev, id, i){
    //this.subscription.unsubscribe(); 
    let cilentRow = new (ElementRef)(document.getElementById(i));
    this.renderer.addClass(cilentRow.nativeElement, 'input-border-focus');
    const popover = await this.popoverCtrl.create({
      component: ClientPopoverPage,
      componentProps: {
        'id': id,
        'homeRef': this
      },
      
      size: "auto",
      dismissOnSelect: true,
      event: ev,
      //side: "start" ,
      //alignment:"start",
      triggerAction:"context-menu",
      animated:true,
      keyboardClose:true,
      cssClass: 'my-custom-class',
    });
    
    await popover.present();
    const { role } =  await popover.onDidDismiss();
    this.renderer.removeClass(cilentRow.nativeElement, 'input-border-focus');
    if(role == 'backdrop'){}
      this.subscription = this.platform.backButton.subscribeWithPriority(1111, () => { });
  }

  newClient(){
    this.subscription.unsubscribe(); 
    this.router.navigate(['/new-client-page-one']);
  }
  items = [];  
  numTimesLeft = 10;  
  
  async loadData(event) {  
    setTimeout(() => {  
      this.offset=this.offset+1  
      this.getClients()
      this.numTimesLeft -= 1;  
      event.target.complete();  
    }, 500);  

  }  
  addMoreItems() {  
    for (let i = 0; i < 10; i++) {  
      this.items.push(i);  
    }  

  }  
}
