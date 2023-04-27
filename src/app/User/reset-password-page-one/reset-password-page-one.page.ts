import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { HttpService } from 'src/app/services/http.service';
import { alertController } from '@ionic/core/dist/ionic/index.esm.js';
import { Location } from '@angular/common';
import { LanguageService } from 'src/app/services/language.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-reset-password-page-one',
  templateUrl: './reset-password-page-one.page.html',
  styleUrls: ['./reset-password-page-one.page.scss'],
})
export class ResetPasswordPageOnePage implements OnInit {
  @ViewChild('footer', {read: ElementRef}) footer: ElementRef;
  formData: FormGroup;

  constructor(private router: Router, 
              private keyboard: Keyboard, 
              private renderer: Renderer2, 
              private http: HttpService, 
              private location: Location,
              private storage: Storage,
              private languageService: LanguageService, 
              
              ) {   this.storage.get('user').then(val => {
                if(val)
                  this.router.navigate(['/menu/dashboard']);
              });}

  ngOnInit() {
    
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });

    this.keyboard.onKeyboardWillShow().subscribe(() => {
			this.renderer.addClass(this.footer.nativeElement, 'hide');
		});

    this.keyboard.onKeyboardWillHide().subscribe(() => {
			this.renderer.removeClass(this.footer.nativeElement, 'hide');
		});
  }

  get email(){return this.formData.get('email');}
  

 async onSubmit(){
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });
    if(!this.email.invalid){
      this.http.resetPassword('/user/reset', {email: this.email.value}, lang).subscribe(async (res: any) => {
        console.log(res.status.message);
        if(lang=='en'){
          const alert = await alertController.create({
            header: 'Oops',
            message: res.status.message,
            buttons: ['Agree'],
          });
          await alert.present();
        }
        if(lang == 'fr'){
          const alert = await alertController.create({
            header: 'Oops',
            message: res.status.message ,
            buttons: ['Accepter'],
          });
          await alert.present();
        }
        if(lang == 'ar'){
          const alert = await alertController.create({
            header: 'Oops',
            message: res.status.message ,
            buttons: ['موافق'],
          });
          await alert.present();
        }
        if(res.status.code == 200){
          if(lang == 'en'){
            const alert = await alertController.create({
              header: '',
              message: 'the email is sent successfully' ,
              buttons: ['Agree'],
            });
            await alert.present();
          }
          if(lang == 'fr'){
            const alert = await alertController.create({
              header: '',
              message: 'le e-mail est envoyé avec succès' ,
              buttons: ['Accepter'],
            });
            await alert.present();
          }
          if(lang == 'ar'){
            const alert = await alertController.create({
              header: '',
              message: 'تم إرسال البريد الإلكتروني بنجاح' ,
              buttons: ['موافق'],
            });
            await alert.present();
          }
        
          this.router.navigate(['/login']);
        }
      }, err => {
      });
    }
   
  }

  goBack(){
    this.location.back();
    
  }

}
