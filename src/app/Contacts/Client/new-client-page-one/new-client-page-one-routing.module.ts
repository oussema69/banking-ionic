import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewClientPageOnePage } from './new-client-page-one.page';

const routes: Routes = [
  {
    path: '',
    component: NewClientPageOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewClientPageOnePageRoutingModule {}
