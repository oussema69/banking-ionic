import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageOnePageRoutingModule } from './reset-password-page-one-routing.module';

import { ResetPasswordPageOnePage } from './reset-password-page-one.page';
import { TranslateModule } from '@ngx-translate/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordPageOnePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [ResetPasswordPageOnePage],
  providers: [
    Keyboard,
    Device
  ]
})
export class ResetPasswordPageOnePageModule {}
