import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListContactPageRoutingModule } from './list-contact-routing.module';

import { ListClientPage } from './list-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListContactPageRoutingModule
  ],
  declarations: [ListClientPage]
})
export class ListContactPageModule {}
