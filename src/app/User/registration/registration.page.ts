import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { alertController } from '@ionic/core/dist/ionic/index.esm.js';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LanguageService } from 'src/app/services/language.service';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  showPassword = false;
  formData: FormGroup;

  constructor(private http: HttpService, 
              private router: Router,  
              private location: Location, 
              private languageService: LanguageService, 
              private storage: Storage, 
              private googlePlus: GooglePlus,
              private device: Device) { }

  async ngOnInit() {
    console.log(this.device);
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required])
    });
  }

  get name(){return this.formData.get('name');}
  get email(){return this.formData.get('email');}
  get password(){return this.formData.get('password');}

  async onSubmit(){
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });

    if(this.name.invalid || this.email.invalid || this.password.invalid){
      if(lang == 'en'){
        const alert = await alertController.create({
          header: 'Oops',
          message: 'must complete the form' ,
          buttons: ['Agree'],
        });
        await alert.present();
      }
      if(lang == 'fr'){
        const alert = await alertController.create({
          header: 'Oops',
          message: 'doit remplire le formulaire' ,
          buttons: ['Agree'],
        });
        await alert.present();
      }
      if(lang == 'ar'){
        const alert = await alertController.create({
          header: 'Oops',
          message: 'يجب إكمال المعلومات' ,
          buttons: ['Agree'],
        });
        await alert.present();
      }

      return null;
    }

    this.http.registration("/user/register", this.formData.value, lang).subscribe(async (res: any) => {
      console.log(res);
      if(res.status.code != 200){
        if(res.status.code == 403){
          this.router.navigate(['/emailvalid', this.formData.value.email]);
        }else{
          const alert = await alertController.create({
            header: 'Oops',
            message: res.status.message || res.message,
            buttons: ['Agree'],
          });
          await alert.present();
        }
      }
    },
    (err) => {
      console.log(err);
    })
  }

  toggleShow(){
    const app = document.getElementById("pass");
    this.showPassword = !this.showPassword;
    if(this.showPassword)
      app.setAttribute("type","text");
    else
      app.setAttribute("type","password");
  }

  goBack(){
    this.location.back()
  }

  setLang(lang: string){
    this.languageService.setLanguage(lang);
  }

  async googleSignup() {
    let resultat!:any;
    await this.googlePlus.login({})
      .then(async (res: any) => {
        console.log('Logged into Google!', res);
        resultat = res;
      })
      .catch(err => console.log('Error logging into Google', err));

      const dataSend = {
        name: resultat.displayName,
        email: resultat.email,
        uuid: this.device.uuid,
      platform: this.device.platform,
      os_version: this.device.version,
      mobile_token: this.device.serial,
      model: this.device.model
      }
      let lang = '';
      await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
        lang = val;
      });
      this.http.login('/user/social/google', dataSend, lang).subscribe(async (res: any) => {
        console.log(res);
        if(res.status.code != 200){
          const alert = await alertController.create({
            header: 'Oops',
            message: res.status.message || res.message,
            buttons: ['Agree'],
          });
          await alert.present();
        }else{
          this.storage.set('name', res.data.user.name);
          this.storage.set('access_token',res.data.device.access_token);
          this.storage.set('company_id',res.data.companyId);
          this.router.navigate(['/dashboard']);
        }
      },
      (err: any)=>{
        console.log(err);
      });
  }

}
