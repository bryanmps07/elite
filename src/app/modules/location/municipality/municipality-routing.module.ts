import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MunicipalityListComponent } from './pages/municipality-list/municipality-list.component';
import { MunicipalityFormComponent } from './pages/municipality-form/municipality-form.component';
import { AuthGuard } from '../../auth/guards/auth.guard';

const routes: Routes = [
  {
      path: '',
      component: MunicipalityListComponent,
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
      component: MunicipalityFormComponent,
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
      component: MunicipalityFormComponent,
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
export class MunicipalityRoutingModule { }
