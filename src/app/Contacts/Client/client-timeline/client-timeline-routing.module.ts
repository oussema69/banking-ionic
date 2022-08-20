import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientTimelinePage } from './client-timeline.page';

const routes: Routes = [
  {
    path: '',
    component: ClientTimelinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientTimelinePageRoutingModule {}
