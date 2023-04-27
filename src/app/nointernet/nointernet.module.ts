import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NointernetPageRoutingModule } from './nointernet-routing.module';

import { NointernetPage } from './nointernet.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NointernetPageRoutingModule,
    TranslateModule
  ],
  declarations: [NointernetPage]
})
export class NointernetPageModule {}

