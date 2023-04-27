import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListContactPageRoutingModule } from './list-contact-routing.module';

import { ListClientPage } from './list-contact.page';
import { ContactclientsPipe } from 'src/app/pipes/contactclients.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListContactPageRoutingModule,
    TranslateModule,
    
  ],
  declarations: [ListClientPage,ContactclientsPipe]
})
export class ListContactPageModule {}
