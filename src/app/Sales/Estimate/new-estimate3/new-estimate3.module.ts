import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEstimate3PageRoutingModule } from './new-estimate3-routing.module';

import { NewEstimate3Page } from './new-estimate3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEstimate3PageRoutingModule
  ],
  declarations: [NewEstimate3Page]
})
export class NewEstimate3PageModule {}
