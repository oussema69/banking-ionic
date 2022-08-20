import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCompanyPageTwoPageRoutingModule } from './new-company-page-two-routing.module';

import { NewCompanyPageTwoPage } from './new-company-page-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCompanyPageTwoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewCompanyPageTwoPage]
})
export class NewCompanyPageTwoPageModule {}
