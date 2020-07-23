import { DepartmentService } from './../shared/services/department.service';
import { DepartmentRouteModule } from './department-route.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DepartmentComponent} from './department.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import {DepartmentSearchComponent} from './department-search/department-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ToastModule } from 'ng2-toastr';
import { SharedComponentsModule } from './../shared/components/common/common.module';
import {PubSubService} from './../shared/services/pub-sub/pub-sub.service';

@NgModule({
  imports: [DepartmentRouteModule,
    CommonModule, ToastModule.forRoot(),
    FormsModule,
    NgbModule , SharedComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DepartmentComponent, DepartmentSearchComponent,
    DepartmentDetailComponent
  ], providers: [DepartmentService,
  PubSubService]
})
export class DepartmetModule { }
