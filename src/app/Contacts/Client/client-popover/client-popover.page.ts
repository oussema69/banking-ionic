import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { alertController } from '@ionic/core/dist/ionic/index.esm.js';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-client-popover',
  templateUrl: './client-popover.page.html',
  styleUrls: ['./client-popover.page.scss'],
})
export class ClientPopoverPage implements OnInit {
  @Input() id: string;
  @Input() homeRef: any;
  acces_token = '';
  company_id = '';

  constructor(private storage: Storage, 
              private http: HttpService, 
              private router: Router,
              public loadingController: LoadingController, 
              private popoverCtrl: PopoverController) { }

  async ngOnInit() {
    await this.storage.get('access_token').then(val => {
      this.acces_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
    });
  }

  async synthesis(){
    await this.popoverCtrl.dismiss();
    this.router.navigate(['/client-synthesis', this.id]);
  }

  async editClient(){
    await this.popoverCtrl.dismiss();
    this.router.navigate(['/edit-client', this.id]);
  }

  async invoices(){
    await this.popoverCtrl.dismiss();
    this.router.navigate(['/client-invoices', this.id]);
  }

  async payments(){
    await this.popoverCtrl.dismiss();
    this.router.navigate(['/client-payments', this.id]);
  }

  async timeline(){
    await this.popoverCtrl.dismiss();
    this.router.navigate(['/client-timeline', this.id]);
  }

  async deleteClient(){
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });
  
    await this.popoverCtrl.dismiss();
    if(lang=='en'){
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
        this.http.client('/company/'+this.company_id+'/client/'+this.id+'/delete', 'en', this.acces_token).subscribe(async (res: any) => {
          console.log(res);
          await loading.dismiss();
          this.homeRef.getClients();
          if(res.status.code == 501){
            const alert = await alertController.create({
              header: 'Oops',
              message: res.message ,
              buttons: ['Agree'],
            });
            await alert.present();
          }
        }, err => {
          console.log(err);
        });
      }
    }
    if(lang=='fr'){
      const alert = await alertController.create({
        header: '',
        message: 'voulez-vous supprimer ?',
        buttons: [
          {
            text: 'OUI',
            role: 'yes'
          }, {
            text: 'Non',
            role: 'no'
          }],
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      if(role == 'yes'){
        const loading = await this.loadingController.create({
          message: 'Sil vous plaît, attendez...'
        });
        await loading.present();
        this.http.client('/company/'+this.company_id+'/client/'+this.id+'/delete', 'en', this.acces_token).subscribe(async (res: any) => {
          console.log(res);
          await loading.dismiss();
          this.homeRef.getClients();
          if(res.status.code == 501){
            const alert = await alertController.create({
              header: 'Oops',
              message: res.message ,
              buttons: ['Agree'],
            });
            await alert.present();
          }
        }, err => {
          console.log(err);
        });
      }
    }
    if(lang=='ar'){
      const alert = await alertController.create({
        header: '',
        message: 'هل تريد أن تحذف؟',
        buttons: [
          {
            text: 'نعم',
            role: 'yes'
          }, {
            text: 'لا',
            role: 'no'
          }],
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      if(role == 'yes'){
        const loading = await this.loadingController.create({
          message: 'أرجو الإنتظار...'
        });
        await loading.present();
        this.http.client('/company/'+this.company_id+'/client/'+this.id+'/delete', 'en', this.acces_token).subscribe(async (res: any) => {
          console.log(res);
          await loading.dismiss();
          this.homeRef.getClients();
          if(res.status.code == 501){
            const alert = await alertController.create({
              header: 'Oops',
              message: res.message ,
              buttons: ['Agree'],
            });
            await alert.present();
          }
        }, err => {
          console.log(err);
        });
      }
    }


  }

}
