import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { alertController } from '@ionic/core/dist/ionic/index.esm.js';

@Component({
  selector: 'app-new-company-page-one',
  templateUrl: './new-company-page-one.page.html',
  styleUrls: ['./new-company-page-one.page.scss'],
})
export class NewCompanyPageOnePage implements OnInit {
  formData: FormGroup;
  @ViewChild('inputFile') inputFile: HTMLButtonElement ;
  @ViewChild('companyNameInput', {read: ElementRef}) companyNameInput: ElementRef;
  @ViewChild('telInput', {read: ElementRef}) telInput: ElementRef;
  @ViewChild('webInput', {read: ElementRef}) webInput: ElementRef;
 file:any;
 url: any = [];

  passInput: any;
  constructor(private storage: Storage, private router: Router, private location: Location, 
    private renderer: Renderer2,
    ) { }

  ngOnInit() {
    this.formData = new FormGroup({
      companyName : new FormControl('', Validators.required),
      pdfLang: new FormControl('en', Validators.required),
      phoneNumber: new FormControl('', [Validators.pattern("^[0-9]*$"),Validators.required,Validators.minLength(8)]),
      webSite: new FormControl('', [Validators.pattern("(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+(?:\\.[\\w_-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?")]),
    });
    this.url='../../assets/img/Groupe 17.png'
  }

  onImageUpload(event) {
   

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        this.url = event.target.result;
        console.log('image :',this.url)
      };
    }
  }
  get companyName(){return this.formData.get('companyName')}
  get pdfLang(){return this.formData.get('pdfLang')}
  get phoneNumber(){return this.formData.get('phoneNumber')}
  get webSite(){return this.formData.get('webSite')}

 async onSubmit(){
    let lang = '';
    await this.storage.get('SELECTED_LANGUAGE').then((val: string) => {
      lang = val;
    });
    if(this.companyName.valid && this.phoneNumber.valid && this.webSite.valid ){
      let data = {
        title: this.companyName.value,
        language: this.pdfLang.value,
        phone: this.phoneNumber.value,
        website: this.webSite.value,
        logo:this.url,
        country_id: '',
        bank: '',
        rib:'',
        bs: '',
        currency_id: '',
        address: '1 Taher Haded',
        state: 'tunis',
        zip_code: '2034',
        activity_id: '',
        fiscal_id: '',
        accounting_period_id: ''
      };
      console.log('data : ' , data)
      this.storage.set('newCompany', data);
      this.router.navigate(['/new-company-page-two']);
    }else{
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
          buttons: ['موافق'],
        });
        await alert.present();
      }

      return null;
    }
  
  }

  openInputFile(){
    console.log('input file :',this.inputFile);
    
    // this.inputFile.nativeElement.click();
  }



  goBack(){
    this.location.back()
  }
  validateCName(){
    if(this.companyName.invalid){
      this.renderer.removeClass(this.companyNameInput.nativeElement, 'input-border-crr');
      this.renderer.addClass(this.companyNameInput.nativeElement, 'input-border-err');
    }else{
      this.renderer.removeClass(this.companyNameInput.nativeElement, 'input-border-err');
      this.renderer.addClass(this.companyNameInput.nativeElement, 'input-border-crr');
    }
  }
  validateTel(){
    if(this.phoneNumber.invalid){
      this.renderer.removeClass(this.telInput.nativeElement, 'input-border-crr');
      this.renderer.addClass(this.telInput.nativeElement, 'input-border-err');
    }else{
      this.renderer.removeClass(this.telInput.nativeElement, 'input-border-err');
      this.renderer.addClass(this.telInput.nativeElement, 'input-border-crr');
    }
  }
  validateWeb(){
    if(this.webSite.invalid){
      this.renderer.removeClass(this.webInput.nativeElement, 'input-border-crr');
      this.renderer.addClass(this.webInput.nativeElement, 'input-border-err');
    }else{
      this.renderer.removeClass(this.webInput.nativeElement, 'input-border-err');
      this.renderer.addClass(this.webInput.nativeElement, 'input-border-crr');
    }
  }
}
