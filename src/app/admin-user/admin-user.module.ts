import {AdminUserDetailComponent} from './admin-user-detail/admin-user-detail.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminUserComponent} from './admin-user.component';
import {AdminUserRoutingModule} from './admin-user-routing.module';
import {ToastModule} from 'ng2-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedComponentsModule} from './../shared/components/common/common.module';
import {AngularDualListBoxModule} from 'angular-dual-listbox';
import {DepartmentService} from './../shared/services/department.service';
import {PubSubService} from './../shared/services/pub-sub/pub-sub.service';
import {AdminUserSearchComponent} from './admin-user-search/admin-user-search.component';
import {CommonService} from './../shared/services/common.service';
import {NgxDualListboxModule} from 'ngx-dual-listbox';

@NgModule({
  imports: [
    CommonModule, AdminUserRoutingModule, ToastModule.forRoot(),
    FormsModule,
    NgbModule, SharedComponentsModule,
    AngularDualListBoxModule,
    ReactiveFormsModule
  ],
  declarations: [AdminUserComponent, AdminUserDetailComponent, AdminUserSearchComponent],
  providers: [CommonService, DepartmentService, PubSubService]
})
export class AdminUserModule {
}
