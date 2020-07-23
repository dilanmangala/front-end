import { MyTaskHistoryService } from './../../services/my-task-history.service';
// import { BreadcrumbAdjustmentsComponent } from './../../breadcrumb-adjustments/breadcrumb-adjustments.component';
// import { BreadcrumbAdjustmentsComponent } from './breadcrumb-adjustments/breadcrumb-adjustments.component';
import {PubSubService} from './../../services/pub-sub/pub-sub.service';
import {StepperComponent} from './stepper/stepper.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddModifiedReasonComponent} from './add-modified-reason/add-modified-reason.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastModule, ToastsManager} from 'ng2-toastr';
import {PermissionComponent} from '../permission/permission.component';
import {DepartmentService} from '../../services/department.service';
import {MonthPickerComponent} from './month-picker/month-picker.component';
import { TreeviewModule } from 'ngx-treeview';
// import { BreadcrumbAdjustmentsComponent } from './breadcrumb-adjustments/breadcrumb-adjustments.component';

@NgModule({
  imports: [
    CommonModule,
    ToastModule.forRoot()
    , FormsModule,
    NgbModule,
    ReactiveFormsModule,
    TreeviewModule.forRoot()],
  declarations: [StepperComponent,
    MonthPickerComponent,
    AddModifiedReasonComponent,
    //  BreadcrumbAdjustmentsComponent,
    PermissionComponent],
  exports: [StepperComponent,
    AddModifiedReasonComponent,
    PermissionComponent,
    MonthPickerComponent],
  providers: [MyTaskHistoryService,
    DepartmentService]
})
export class SharedComponentsModule {
}
