import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinceListComponent } from './pages/province-list/province-list.component';
import { ProvinceFormComponent } from './pages/province-form/province-form.component';
import { AuthGuard } from '../../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProvinceListComponent,
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
    component: ProvinceFormComponent,
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
    component: ProvinceFormComponent,
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
export class ProvincesRoutingModule { }
