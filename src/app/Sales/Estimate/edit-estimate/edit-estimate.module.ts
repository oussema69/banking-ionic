import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEstimatePageRoutingModule } from './edit-estimate-routing.module';

import { EditEstimatePage } from './edit-estimate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEstimatePageRoutingModule
  ],
  declarations: [EditEstimatePage]
})
export class EditEstimatePageModule {}
