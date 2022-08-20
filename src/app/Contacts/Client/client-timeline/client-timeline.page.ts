import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-client-timeline',
  templateUrl: './client-timeline.page.html',
  styleUrls: ['./client-timeline.page.scss'],
})
export class ClientTimelinePage implements OnInit {

  id = "";
  access_token = "";
  company_id = "";
  lang = "";
  payments: any = [];
  invoices: any = [];
  estimates: any = [];

  constructor(private storage: Storage, private http: HttpService, private route :ActivatedRoute) { }

  async ngOnInit() {
    this.id = this.route.snapshot.params[`id`];
    await this.storage.get('access_token').then(val => {
      this.access_token = val;
    });
    await this.storage.get('company_id').then(val => {
      this.company_id = val;
    });
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      this.lang = val;
    });
  }

}
