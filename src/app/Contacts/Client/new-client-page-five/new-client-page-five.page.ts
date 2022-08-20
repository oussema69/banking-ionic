import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';

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

  constructor(private storage: Storage, private router: Router, private http: HttpService) { }

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

  onSubmit(){
    this.dataSend.note = this.note;
    console.log(this.dataSend);
    this.http.saveClient('/company/'+this.company_id+'/client/new', this.dataSend, 'en', this.access_token).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/menu/list-client']);
    }, err => {
      console.log(err);
    })
  }

}
