import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuardService } from './layouts/login-page/auth-guard.service';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path : '',
    loadChildren : './layouts/login-page/login-page.module#LoginPageModule'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
          path: '',
          loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        }],
        canActivate: [AuthGuardService],
        data: {allowedRoles: ['ADMIN', 'SUPER_USER']}

  },
  {
    path: '**',
    redirectTo: 'sign-in'
  }
]
