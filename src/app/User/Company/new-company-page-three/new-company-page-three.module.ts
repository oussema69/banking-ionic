import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCompanyPageThreePageRoutingModule } from './new-company-page-three-routing.module';

import { NewCompanyPageThreePage } from './new-company-page-three.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCompanyPageThreePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [NewCompanyPageThreePage]
})
export class NewCompanyPageThreePageModule {}
