import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { Storage } from '@ionic/storage';
import { ViewWillEnter } from '@ionic/angular/types/ionic-lifecycle-hooks';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements ViewWillEnter {
  constructor(private languageService: LanguageService, private router: Router, private storage: Storage) {
    this.initializeApp();
  }

  ionViewWillEnter(){
    this.storage.get('user').then(async val => {
      console.log(val);
    if(val)
      this.router.navigate(['/menu/dashboard']);
    else
      this.router.navigate(['/login']);
    });
  }

  initializeApp(){
    this.languageService.setInitialAppLanguage();
  }
}
