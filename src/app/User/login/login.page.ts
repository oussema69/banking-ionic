import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { alertController } from '@ionic/core/dist/ionic/index.esm.js';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@awesome-cordova-plugins/facebook/ngx';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { LanguageService } from 'src/app/services/language.service';
import { Storage } from '@ionic/storage';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { LoadingController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter {

  formData: FormGroup;
  @ViewChild('emailInput', {read: ElementRef}) emailInput: ElementRef;
  @ViewChild('passwordInput', {read: ElementRef}) passwordInput: ElementRef;

  constructor(private http: HttpService, 
              private router: Router, 
              private fb: Facebook, 
              private googlePlus: GooglePlus, 
              private languageService: LanguageService, 
              private storage: Storage,
              private device: Device,
              public loadingController: LoadingController,
              private renderer: Renderer2) { 
                this.storage.get('user').then(val => {
                  if(val)
                    this.router.navigate(['/menu/dashboard']);
                });
              }

  ionViewWillEnter(){
    this.storage.get('user').then(async val => {
      console.log(val);
      if(val)
        this.router.navigate(['/menu/dashboard']);
    });
  }

  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required])
    });
  }

  validateEmail(){
    if(this.email.invalid){
      this.renderer.removeClass(this.emailInput.nativeElement, 'input-border-crr');
      this.renderer.addClass(this.emailInput.nativeElement, 'input-border-err');
    }else{
      this.renderer.removeClass(this.emailInput.nativeElement, 'input-border-err');
      this.renderer.addClass(this.emailInput.nativeElement, 'input-border-crr');
    }
  }

  validatePassword(){
    if(this.password.invalid){
      this.renderer.removeClass(this.passwordInput.nativeElement, 'input-border-crr');
      this.renderer.addClass(this.passwordInput.nativeElement, 'input-border-err');
    }else{
      this.renderer.removeClass(this.passwordInput.nativeElement, 'input-border-err');
      this.renderer.addClass(this.passwordInput.nativeElement, 'input-border-crr');
    }
  }

  
  get email(){return this.formData.get('email');}
  get password(){return this.formData.get('password');}

  async onSubmit(){
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });

    if(this.email.invalid || this.password.invalid){
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
          buttons: ['Accepter'],
        });
        await alert.present();
      }
      if(lang == 'ar'){
        const alert = await alertController.create({
          header: 'Oops',
          message: 'يجب إكمال المعلومات' ,
          buttons: ['اتفق'],
        });
        await alert.present();
      }

      return null
    }

    const dataSend = {
      email: this.formData.value.email,
      password: this.formData.value.password,
      uuid: this.device.uuid,
      platform: this.device.platform,
      os_version: this.device.version,
      mobile_token: this.device.serial,
      model: this.device.model
    }

    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();

    this.http.login('/user/login', dataSend, lang).subscribe(async (res: any) => {
      console.log(res);
      await loading.dismiss();
      if(res.status.code != 200){
        if(res.status.code == 402){
          this.router.navigate(['/emailvalid', this.formData.value.email]);
        } else if(res.status.code == 202) {
          this.storage.set('access_token',res.data.device.access_token);
          this.router.navigate(['/subscription']);
        }else if(res.status.code == 203){
          this.storage.set('access_token',res.data.device.access_token);
          this.router.navigate(['/new-company-page-one']);
        }else{
          const alert = await alertController.create({
            header: 'Oops',
            message: res.status.message || res.message,
            buttons: ['Agree'],
          });
          await alert.present();
        }
      }else{
        this.storage.set('access_token',res.data.device.access_token);
        this.storage.set('name', res.data.user.name);
        this.storage.set('company_id',res.data.companyId);
        this.storage.set('company_list', res.data.ownedCompanies);
        this.storage.set('user', res.data.user);
        this.router.navigate(['/menu/dashboard']);
      }
    },
    (err)=>{
      console.log(err);
    });
  }

  facebookSignup() {
    this.fb.getLoginStatus().then(res => {
      if (res.status === 'connected') {
        // Already logged in to FB so pass credentials to provider (in my case firebase)
        // let provider = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        // firebase.auth().signInWithCredential(provider).then((authToken) => {
        //    this.authToken = authToken;
        // });
    } else {
      console.log(res)
        this.fb.login([]).then((userData) => {
          console.log(userData);
        }).catch((err) => {
          console.log(err);
        });
    }})

  }

  async googleSignup() {
    let resultat!:any
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
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      await loading.present();
      this.http.login('/user/social/google', dataSend, lang).subscribe(async (res: any) => {
        console.log(res);
        await loading.dismiss();
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
          this.storage.set('company_list', res.data.ownedCompanies);
          this.storage.set('user', res.data.user);
          this.router.navigate(['/menu/dashboard']);
        }
      },
      (err: any)=>{
        console.log(err);
      });
  }

  resetPassword(){
    this.router.navigate(['/reset-password-page-one']);
  }
  
  setLang(lang: string){
    this.languageService.setLanguage(lang);
  }

  getUser(){
    return this.storage.get('user')
  }

  trah(){
    this.router.navigate(['/new-estimate']);
  }

}
