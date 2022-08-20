import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailValidationPageRoutingModule } from './email-validation-routing.module';

import { EmailValidationPage } from './email-validation.page';
import { TranslateModule } from '@ngx-translate/core';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailValidationPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [EmailValidationPage],
  providers: [
    Keyboard
  ]
})
export class EmailValidationPageModule {}
