import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListSalesPageRoutingModule } from './list-sales-routing.module';

import { ListEstimatePage } from './list-sales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListSalesPageRoutingModule
  ],
  declarations: [ListEstimatePage]
})
export class ListSalesPageModule {}
