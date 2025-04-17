import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only:[],
    //     redirectTo: '/unauthorized'
    //   }
    // },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
