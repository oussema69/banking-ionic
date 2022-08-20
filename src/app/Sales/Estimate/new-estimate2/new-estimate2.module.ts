import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEstimate2PageRoutingModule } from './new-estimate2-routing.module';

import { NewEstimate2Page } from './new-estimate2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEstimate2PageRoutingModule
  ],
  declarations: [NewEstimate2Page]
})
export class NewEstimate2PageModule {}
