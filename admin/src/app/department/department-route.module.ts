import { Routes, RouterModule } from "@angular/router";
import { DepartmentComponent } from './department.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RoleGuard} from '../shared/services/auth/role.guard';
const route: Routes = [
  {
    path: "",
    children: [
      {
        path: "add-department",
        component: DepartmentComponent,
        data: {
          expectedRole: 'PERM_CREATE_DEPARTMENT',
          title: "Create Department",
          urls: [
            {
              title: "Home"
            },
            { title: "RPA Operations" },
            { title: "Profile" },
            { title: "Add Department" },
            { title: "Create Department Profile" }
          ]
        }
      },
      {
        path: "manage-department",
        component: DepartmentComponent,
        data: {
          expectedRole: 'PERM_EDIT_UPDATE_DEPARTMENT',
          title: "Manage Department",
          urls: [
            {
              title: "Home"
            },
            { title: "RPA Operations", url: "/manage-customer" },
            { title: "Manage Department" }
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
export class DepartmentRouteModule {}
