import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewClientPageFoorPage } from './new-client-page-foor.page';

const routes: Routes = [
  {
    path: '',
    component: NewClientPageFoorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewClientPageFoorPageRoutingModule {}
