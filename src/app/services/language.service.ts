import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(private translate: TranslateService, private storage: Storage) { }

  async setInitialAppLanguage(){
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    this.translate.use('en');
    await this.storage.create();
    this.storage.set(LNG_KEY, 'en');
    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }

  getLanguage() {
    return [
      { text: 'English', value: 'en', img: 'assets/img/Icons-Flag-United-states-of-america.png'},
      { text: 'Frensh', value: 'fr', img: 'assets/img/Icons-Flag-France.png'},
      { text: 'Arabic', value: 'ar', img: 'assets/img/Icons-Flag-Tunisia.png'}
    ];
  }

  setLanguage(lng) {
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
  }
}
