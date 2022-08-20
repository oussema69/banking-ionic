import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { alertController } from '@ionic/core/dist/ionic/index.esm.js';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.page.html',
  styleUrls: ['./email-validation.page.scss'],
})
export class EmailValidationPage implements OnInit {

  formData: FormGroup;
  email = "";
  @ViewChild('input2') myInput2: any ;
  @ViewChild('input3') myInput3: any ;
  @ViewChild('input4') myInput4: any ;
  previousUrl: string;
  @ViewChild('footer', {read: ElementRef}) footer: ElementRef;

  constructor(private http: HttpService, 
              private router: Router, 
              private route :ActivatedRoute, 
              private location: Location, 
              private storage: Storage, 
              private keyboard: Keyboard, 
              private renderer: Renderer2) { }

  ngOnInit() {
    this.email = this.route.snapshot.params[`email`];
    this.formData = new FormGroup({
      num1: new FormControl('', Validators.required),
      num2: new FormControl('', Validators.required),
      num3: new FormControl('', Validators.required),
      num4: new FormControl('', Validators.required)
    });

    setTimeout(()=>{
      this.renderer.removeClass(this.footer.nativeElement, 'hide');
    }, 300);

    this.keyboard.onKeyboardWillShow().subscribe(() => {
			this.renderer.addClass(this.footer.nativeElement, 'hide');
		});

    this.keyboard.onKeyboardWillHide().subscribe(() => {
			this.renderer.removeClass(this.footer.nativeElement, 'hide');
		});
  }

  get num1(){return this.formData.get('num1');}
  get num2(){return this.formData.get('num2');}
  get num3(){return this.formData.get('num3');}
  get num4(){return this.formData.get('num4');}

  async onSubmit(){
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });

    if(this.num1.invalid || this.num2.invalid || this.num3.invalid || this.num4.invalid){
      if(lang=='en'){
        const alert = await alertController.create({
          header: 'Oops',
          message: "Code is required",
          buttons: ['Agree'],
        });
        await alert.present();
      }
      if(lang == 'fr'){
        const alert = await alertController.create({
          header: 'Oops',
          message: 'Le code est requis' ,
          buttons: ['Agree'],
        });
        await alert.present();
      }
      if(lang == 'ar'){
        const alert = await alertController.create({
          header: 'Oops',
          message: 'الرمز مطلوب' ,
          buttons: ['Agree'],
        });
        await alert.present();
      }

      return null;
    }
    let numero = this.formData.value.num1+this.formData.value.num2+this.formData.value.num3+this.formData.value.num4;

    const dataSend = {
      code: numero,
      email: this.email
    };
    this.http.registration('/user/email/validate', dataSend, lang).subscribe(async (res: any) => {
      console.log(res);
      if(res.status.code != 200){
        const alert = await alertController.create({
          header: 'Oops',
          message: res.message.email || res.message || res.message.code,
          buttons: ['Agree'],
        });
        await alert.present();
      }else{
        this.router.navigate(['/subscription']);
      }
    },
    (err) => {
      console.log(err);
    })
  }

  nextNum(num: string){
    setTimeout(()=>{
      if(this.num1.value>="0" && this.num1.value<="9" && num=="num1")
        this.myInput2.setFocus();
      
      if(this.num2.value>="0" && this.num2.value<="9" && num=="num2")
        this.myInput3.setFocus();

      if(this.num3.value>="0" && this.num3.value<="9" && num=="num3")
        this.myInput4.setFocus();

    },150);
  } 

  goBack(){
    this.location.back()
  }

}
