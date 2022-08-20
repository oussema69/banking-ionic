import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClientPageOnePageRoutingModule } from './new-client-page-one-routing.module';

import { NewClientPageOnePage } from './new-client-page-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewClientPageOnePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewClientPageOnePage]
})
export class NewClientPageOnePageModule {}
