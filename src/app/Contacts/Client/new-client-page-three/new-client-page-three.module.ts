import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClientPageThreePageRoutingModule } from './new-client-page-three-routing.module';

import { NewClientPageThreePage } from './new-client-page-three.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewClientPageThreePageRoutingModule,
    TranslateModule
  ],
  declarations: [NewClientPageThreePage]
})
export class NewClientPageThreePageModule {}
