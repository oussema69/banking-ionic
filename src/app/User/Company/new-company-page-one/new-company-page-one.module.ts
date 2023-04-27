import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCompanyPageOnePageRoutingModule } from './new-company-page-one-routing.module';

import { NewCompanyPageOnePage } from './new-company-page-one.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCompanyPageOnePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [NewCompanyPageOnePage]
})
export class NewCompanyPageOnePageModule {}
