import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClientPageTwoPageRoutingModule } from './new-client-page-two-routing.module';

import { NewClientPageTwoPage } from './new-client-page-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewClientPageTwoPageRoutingModule
  ],
  declarations: [NewClientPageTwoPage]
})
export class NewClientPageTwoPageModule {}
