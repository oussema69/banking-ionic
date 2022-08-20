import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientSynthesisPageRoutingModule } from './client-synthesis-routing.module';

import { ClientSynthesisPage } from './client-synthesis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientSynthesisPageRoutingModule
  ],
  declarations: [ClientSynthesisPage]
})
export class ClientSynthesisPageModule {}
