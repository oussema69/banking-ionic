import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewClientPageThreePage } from './new-client-page-three.page';

const routes: Routes = [
  {
    path: '',
    component: NewClientPageThreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewClientPageThreePageRoutingModule {}
