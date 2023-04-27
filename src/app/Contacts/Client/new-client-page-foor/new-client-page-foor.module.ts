import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClientPageFoorPageRoutingModule } from './new-client-page-foor-routing.module';

import { NewClientPageFoorPage } from './new-client-page-foor.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewClientPageFoorPageRoutingModule,
    TranslateModule
  ],
  declarations: [NewClientPageFoorPage]
})
export class NewClientPageFoorPageModule {}
