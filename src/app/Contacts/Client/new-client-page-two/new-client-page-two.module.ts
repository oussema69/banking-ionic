import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClientPageTwoPageRoutingModule } from './new-client-page-two-routing.module';

import { NewClientPageTwoPage } from './new-client-page-two.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewClientPageTwoPageRoutingModule,
    TranslateModule,
  ],
  declarations: [NewClientPageTwoPage]
})
export class NewClientPageTwoPageModule {}
