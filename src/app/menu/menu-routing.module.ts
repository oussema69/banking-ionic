import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'list-estimate',
        loadChildren: () => import('../Sales/Estimate/list-estimate/list-sales.module').then( m => m.ListSalesPageModule)
      },
      {
        path: 'list-client',
        loadChildren: () => import('../Contacts/Client/list-client/list-contact.module').then( m => m.ListContactPageModule)
      },
    ]
  },
  {
    path: 'full',
    redirectTo: '/menu/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
