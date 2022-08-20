import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Platform, PopoverController, ViewWillEnter } from '@ionic/angular';
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
  subscription: Subscription;

  constructor(private storage: Storage, 
              private http: HttpService, 
              private popoverCtrl: PopoverController, 
              public loadingController: LoadingController,
              private renderer: Renderer2,
              private router: Router,
              private platform: Platform) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

  ionViewWillEnter(){
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => { });
  }

  async ngOnInit() {
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
  }

  getClients(){
    this.http.getOptions('/company/'+this.company_id+'/client', 'en', this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.clients = res.data.clients;
    }, err => {
      console.log(err);
    });
  }

  async openPopover(ev, id, i){
    this.subscription.unsubscribe(); 
    let cilentRow = new (ElementRef)(document.getElementById(i));
    this.renderer.addClass(cilentRow.nativeElement, 'input-border-focus');
    const popover = await this.popoverCtrl.create({
      component: ClientPopoverPage,
      componentProps: {
        'id': id,
        'homeRef': this
      },
      cssClass: 'custom-popover',
      event: ev
    });
    await popover.present();
    const { role } =  await popover.onDidDismiss();
    console.log(role);
    this.renderer.removeClass(cilentRow.nativeElement, 'input-border-focus');
    if(role == 'backdrop')
      this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => { });
  }

  newClient(){
    this.subscription.unsubscribe(); 
    this.router.navigate(['/new-client-page-one']);
  }

}
