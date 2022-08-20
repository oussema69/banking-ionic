import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPopoverPage } from './client-popover.page';

const routes: Routes = [
  {
    path: '',
    component: ClientPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPopoverPageRoutingModule {}
