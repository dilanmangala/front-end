import {UserRoleComponent} from './user-role.component';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RoleGuard} from '../shared/services/auth/role.guard';

const route: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add-user-role',
        component: UserRoleComponent,
        data: {
          expectedRole: 'PERM_CREATE_USER_ROLE',
          title: 'Create User Role',
          urls: [
            {
              title: 'Home'
            },
            {title: 'Administration'},
            {title: 'User Role'},
            {title: 'Add User Role'},
            {title: 'Create User Role'}
          ]
        }
      },
      {
        path: 'manage-user-role',
        component: UserRoleComponent,
        data: {
          expectedRole: 'PERM_EDIT_USER_ROLES',
          title: 'Manage User Role',
          urls: [
            {
              title: 'Home'
            },
            {title: 'Administration', url: '/manage-customer'},
            {title: 'Manage User Role'}
          ]
        }
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: []
})
export class UserRoleRoutingModule {
}
