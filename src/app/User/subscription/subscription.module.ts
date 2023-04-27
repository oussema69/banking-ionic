import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionPageRoutingModule } from './subscription-routing.module';

import { SubscriptionPage } from './subscription.page';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardPage } from 'src/app/dashboard/dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
  
  ],
  declarations: [SubscriptionPage],
  providers: [
    InAppBrowser
  ]
})
export class SubscriptionPageModule {}
