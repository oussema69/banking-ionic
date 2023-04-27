import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { alertController } from '@ionic/core/dist/ionic/index.esm.js';

@Component({
  selector: 'app-new-client-page-five',
  templateUrl: './new-client-page-five.page.html',
  styleUrls: ['./new-client-page-five.page.scss'],
})
export class NewClientPageFivePage implements OnInit {
  dataSend: any;
  access_token = "";
  company_id = "";
  note = "";

  constructor(private storage: Storage, private router: Router, private http: HttpService,  private location: Location) { }

  async ngOnInit() {
    await this.storage.get('access_token').then(val => {
      this.access_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
    });
    await this.storage.get('new-client').then(val => {
      this.dataSend = val;
    });
  
  }

 async onSubmit(){
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });
    this.dataSend.note = this.note;
    this.http.saveClient('/company/'+this.company_id+'/client/new', this.dataSend, lang, this.access_token).subscribe(async (res: any) => {
     if(res.status.code !=200){
      if(lang == 'en'){
        const alert = await alertController.create({
          header: 'Oops',
          message:  res.message ,
          buttons: ['Agree'],
        });
        await alert.present();
      }
      if(lang == 'fr'){
        const alert = await alertController.create({
          header: 'Oops',
          message:  res.message ,
          buttons: ['Accepter'],
        });
        await alert.present();
      }
      if(lang == 'ar'){
        const alert = await alertController.create({
          header: 'Oops',
          message:  res.message ,
          buttons: ['اتفق'],
          
        });
        await alert.present();
      }
 
     }else{
      this.router.navigate(['/menu/list-client']);

     }
     
      
    }, err => {
      console.log(err,);
    })
  }
  goBack(){
    this.location.back()
  }
}
