import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientTimelinePageRoutingModule } from './client-timeline-routing.module';

import { ClientTimelinePage } from './client-timeline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientTimelinePageRoutingModule
  ],
  declarations: [ClientTimelinePage]
})
export class ClientTimelinePageModule {}
