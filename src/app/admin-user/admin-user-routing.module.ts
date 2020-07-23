import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminUserComponent } from "./admin-user.component";
import {RoleGuard} from '../shared/services/auth/role.guard';
const route: Routes = [
  {
    path: "",
    children: [
      {
        path: "add-admin-users",
        component: AdminUserComponent,

        data: {
          expectedRole: 'PERM_CREATE_USER',
          title: "Create User",
          urls: [
            {
              title: "Home"
            },
            { title: "Administration" },

            { title: "Add User" },
            { title: "Create User" }
          ]
        }
      },
      {
        path: 'manage-admin-users',
        component: AdminUserComponent,
        data: {
          expectedRole: 'PERM_EDIT_UPDATE_USER',
          title: "Manage User",
          urls: [
            {
              title: "Home"
            },
            { title: "Administration", url: "/manage-customer" },
            { title: "Manage User" }
          ]
        }
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(route)
  ],
  declarations: []
})
export class AdminUserRoutingModule { }
