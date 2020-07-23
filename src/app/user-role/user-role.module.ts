// import { PermissionComponent } from './../shared/components/permission/permission.component';
// import { StepperComponent } from './../shared/components/common/stepper/stepper.component';
import { UserRoleComponent } from './user-role.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoleRoutingModule } from './user-role-routing.module';
import { UserRoleDetailComponent } from './user-role-detail/user-role-detail.component';
import { UserRoleSearchComponent } from './user-role-search/user-role-search.component';
import { UserRoleLoginTimeComponent } from './user-role-login-time/user-role-login-time.component';
import { SharedComponentsModule } from '../shared/components/common/common.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { DepartmentService } from '../shared/services/department.service';
import { CommonService } from '../shared/services/common.service';
import { PubSubService } from '../shared';

@NgModule( {
  imports: [ SharedComponentsModule, ReactiveFormsModule, FormsModule, NouisliderModule,
    CommonModule, UserRoleRoutingModule
  ]
  ,  declarations: [UserRoleComponent, UserRoleDetailComponent, UserRoleSearchComponent, UserRoleLoginTimeComponent],
  providers: [DepartmentService, CommonService, PubSubService]
})
export class UserRoleModule { }
