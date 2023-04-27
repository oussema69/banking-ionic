import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPaymentsPageRoutingModule } from './client-payments-routing.module';

import { ClientPaymentsPage } from './client-payments.page';
import { PaymentPipe } from 'src/app/pipes/payment.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientPaymentsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ClientPaymentsPage, PaymentPipe]
})
export class ClientPaymentsPageModule {}
