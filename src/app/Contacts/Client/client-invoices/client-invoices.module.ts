import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientInvoicesPageRoutingModule } from './client-invoices-routing.module';

import { ClientInvoicesPage } from './client-invoices.page';
import { InvoicesPipe } from 'src/app/pipes/invoices.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientInvoicesPageRoutingModule,
    TranslateModule 

    
  ],
  declarations: [ClientInvoicesPage, InvoicesPipe]
})
export class ClientInvoicesPageModule {}
