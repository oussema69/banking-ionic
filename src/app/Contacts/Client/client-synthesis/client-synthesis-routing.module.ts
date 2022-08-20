import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientSynthesisPage } from './client-synthesis.page';

const routes: Routes = [
  {
    path: '',
    component: ClientSynthesisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientSynthesisPageRoutingModule {}
