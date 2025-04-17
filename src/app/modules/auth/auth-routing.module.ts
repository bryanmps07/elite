import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page404Component } from '../../views/pages/page404/page404.component';
import { Page500Component } from '../../views/pages/page500/page500.component';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthLoginComponent,
    canActivate: [NoAuthGuard],
    data: { animation: 'auth' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
