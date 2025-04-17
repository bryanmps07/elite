import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemberListComponent } from './pages/member-list/member-list.component';
import { MemberFormComponent } from './pages/member-form/member-form.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MemberListComponent,
    canActivate: [AuthGuard],
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only:[],
    //     redirectTo: '/unauthorized'
    //   }
    // },
  },
  {
    path: 'add',
    component: MemberFormComponent,
    canActivate: [AuthGuard],
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only:[],
    //     redirectTo: '/unauthorized'
    //   }
    // },
  },
  {
    path: 'edit/:id',
    component: MemberFormComponent,
    canActivate: [AuthGuard],
  //   canActivate: [NgxPermissionsGuard],
  //   data: {
  //     permissions: {
  //       only:[],
  //       redirectTo: '/unauthorized'
  //     }
  //   },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
