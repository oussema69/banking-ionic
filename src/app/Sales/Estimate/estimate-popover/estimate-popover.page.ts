import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';
import { alertController } from '@ionic/core/dist/ionic/index.esm.js';
import { Storage } from '@ionic/storage';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-estimate-popover',
  templateUrl: './estimate-popover.page.html',
  styleUrls: ['./estimate-popover.page.scss'],
})
export class EstimatePopoverPage implements OnInit {
  @Input() id: string;
  @Input() homeRef: any;
  acces_token = '';
  company_id = '';

  constructor(private router: Router, 
              private popoverCtrl: PopoverController, 
              public loadingController: LoadingController,
              private storage: Storage,
              private http: HttpService) { }

  async ngOnInit() {
    await this.storage.get('access_token').then(val => {
      this.acces_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
    });
  }

  async editEstimate(){
    await this.popoverCtrl.dismiss();
    this.router.navigate(['/edit-estimate']);
  }

  async deleteEstimate(){
    await this.popoverCtrl.dismiss();
    const alert = await alertController.create({
      header: 'Oops',
      message: 'do you delete?',
      buttons: [
        {
          text: 'Yes',
          role: 'yes'
        }, {
          text: 'No',
          role: 'no'
        }],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role == 'yes'){
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      await loading.present();
      this.http.client('/company/'+this.company_id+'/sales/estimate/'+this.id+'/delete', 'en', this.acces_token).subscribe(async (res: any) => {
        console.log(res);
        await loading.dismiss();
        this.homeRef.sales();
      }, err => {
        console.log(err);
      })
    }
  }

}
