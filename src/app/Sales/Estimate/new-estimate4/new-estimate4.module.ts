import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEstimate4PageRoutingModule } from './new-estimate4-routing.module';

import { NewEstimate4Page } from './new-estimate4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEstimate4PageRoutingModule
  ],
  declarations: [NewEstimate4Page]
})
export class NewEstimate4PageModule {}
