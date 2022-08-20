import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
import { TranslateModule } from '@ngx-translate/core';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [RegistrationPage],
  providers: [
    GooglePlus,
    Device
  ]
})
export class RegistrationPageModule {}
