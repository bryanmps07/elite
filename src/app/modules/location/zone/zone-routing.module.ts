import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZoneListComponent } from './pages/zone-list/zone-list.component';
import { ZoneFormComponent } from './pages/zone-form/zone-form.component';
import { AuthGuard } from '../../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ZoneListComponent,
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
    component: ZoneFormComponent,
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
    component: ZoneFormComponent,
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
export class ZoneRoutingModule { }
