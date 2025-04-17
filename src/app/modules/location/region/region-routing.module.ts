import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionListComponent } from './pages/region-list/region-list.component';
import { RegionFormComponent } from './pages/region-form/region-form.component';
import { AuthGuard } from '../../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RegionListComponent,
    canActivate: [AuthGuard],
    // canActivate: [NgxPermissionsGuard, AuthGuard],
    // data: {
    //   permissions: {
    //     only:[],
    //     redirectTo: '/unauthorized'
    //   }
    // },
  },
  {
    path: 'add',
    component: RegionFormComponent,
    canActivate: [AuthGuard],
    // canActivate: [NgxPermissionsGuard, AuthGuard],
    // data: {
    //   permissions: {
    //     only:[],
    //     redirectTo: '/unauthorized'
    //   }
    // },
  },
  {
    path: 'edit/:id',
    component: RegionFormComponent,
    canActivate: [AuthGuard],
    // canActivate: [NgxPermissionsGuard, AuthGuard],
    // data: {
    //   permissions: {
    //     only:[],
    //     redirectTo: '/unauthorized'
    //   }
    // },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionRoutingModule { }
