import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UsersFormComponent } from './pages/users-form/users-form.component';
import { AuthGuard } from '../../auth/guards/auth.guard';



const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    canActivate: [AuthGuard],
    // data: {
    //   permissions: {
    //     only:[],
    //     redirectTo: '/unauthorized'
    //   }
    // },
  },
  {
    path: 'add',
    component: UsersFormComponent,
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
    component: UsersFormComponent,
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
export class UsersRoutingModule { }
