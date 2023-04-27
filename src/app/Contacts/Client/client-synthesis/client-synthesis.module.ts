import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientSynthesisPageRoutingModule } from './client-synthesis-routing.module';

import { ClientSynthesisPage } from './client-synthesis.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientSynthesisPageRoutingModule,
    TranslateModule 
  ],
  declarations: [ClientSynthesisPage]
})
export class ClientSynthesisPageModule {}
