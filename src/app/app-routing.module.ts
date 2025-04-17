import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { AdminGuard } from './modules/auth/guards/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'auth',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),

      },
      {
        path: 'pages',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'members',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/members/members.module').then(m => m.MembersModule)
      },
      {
        path: 'access',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/access/access.module').then(m => m.AccessModule)
      },
      {
        path: 'locations',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/location/location.module').then(m => m.LocationModule)
      },
    ]
  },
  // {
  //   path: 'members',
  //   component: DefaultLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       canActivate: [AuthGuard],
  //       loadChildren: () => import('./modules/members/members.module').then(m => m.MembersModule)
  //     }
  //   ]

  // },
  // {
  //   path: 'access',
  //   component: DefaultLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       canActivate: [AuthGuard, AdminGuard],
  //       loadChildren: () => import('./modules/access/access.module').then(m => m.AccessModule)
  //     }
  //   ]

  // },
  // {
  //   path: 'locations',
  //   component: DefaultLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       canActivate: [AuthGuard, AdminGuard],
  //       loadChildren: () => import('./modules/location/location.module').then(m => m.LocationModule)
  //     }
  //   ]

  // },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
