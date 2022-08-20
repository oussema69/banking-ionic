import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPaymentsPageRoutingModule } from './client-payments-routing.module';

import { ClientPaymentsPage } from './client-payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientPaymentsPageRoutingModule
  ],
  declarations: [ClientPaymentsPage]
})
export class ClientPaymentsPageModule {}
