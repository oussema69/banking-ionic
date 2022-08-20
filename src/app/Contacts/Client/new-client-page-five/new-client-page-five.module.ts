import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClientPageFivePageRoutingModule } from './new-client-page-five-routing.module';

import { NewClientPageFivePage } from './new-client-page-five.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewClientPageFivePageRoutingModule
  ],
  declarations: [NewClientPageFivePage]
})
export class NewClientPageFivePageModule {}
