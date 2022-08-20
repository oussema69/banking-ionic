import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Platform, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { EstimatePopoverPage } from '../estimate-popover/estimate-popover.page';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.page.html',
  styleUrls: ['./list-sales.page.scss'],
})
export class ListEstimatePage implements OnInit, OnDestroy {
  acces_token = "";
  company_id = "";
  estimates: any = [];
  subscription: Subscription;

  constructor(private storage: Storage, 
              private router: Router, 
              private http: HttpService, 
              private platform: Platform, 
              private renderer: Renderer2,
              private popoverCtrl: PopoverController) {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => { });
   }

  async ngOnInit() {
    await this.storage.get('access_token').then(val => {
      this.acces_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
    });

    this.sales();
  }

  sales(){
    this.http.getSales('/company/'+this.company_id+'/sales/estimate', 'en', this.acces_token).subscribe((res: any) => {
      console.log(res);
      this.estimates = res.data.estimates;
    }, err => {
      console.log(err);
    });
  }

  async openPopover(ev, id, i){
    this.subscription.unsubscribe(); 
    let cilentRow = new (ElementRef)(document.getElementById(i));
    this.renderer.addClass(cilentRow.nativeElement, 'input-border-focus');
    const popover = await this.popoverCtrl.create({
      component: EstimatePopoverPage,
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

  newEstimate(){
    this.subscription.unsubscribe(); 
    this.router.navigate(['/new-estimate']);
  }

}
