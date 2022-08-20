import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEstimatePageRoutingModule } from './new-estimate-routing.module';

import { NewEstimatePage } from './new-estimate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEstimatePageRoutingModule
  ],
  declarations: [NewEstimatePage]
})
export class NewEstimatePageModule {}
