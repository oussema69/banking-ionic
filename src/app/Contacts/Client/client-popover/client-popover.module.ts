import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPopoverPageRoutingModule } from './client-popover-routing.module';

import { ClientPopoverPage } from './client-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientPopoverPageRoutingModule
  ],
  declarations: [ClientPopoverPage]
})
export class ClientPopoverPageModule {}
