import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared/services/auth/auth.guard';
import {FullComponent, BlankComponent} from './shared';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'department',
        loadChildren: './department/department.module#DepartmetModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'user-role',
        loadChildren: './user-role/user-role.module#UserRoleModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-users',
        loadChildren: './admin-user/admin-user.module#AdminUserModule',
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren:
          './shared/components/authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes //,  { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
