import { MyTaskHistoryV1Component } from './my-task-history-v1/my-task-history-v1.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartistModule } from 'ng-chartist';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DtvBillCheckComponent } from './dtv-bill-check/dtv-bill-check.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { SharedComponentsModule } from '../shared/components/common/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DTVBillCheckService } from '../shared/services/dtv-bill-check.service';
import { ChartsModule } from 'ng2-charts';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { DataTableModule } from 'angular5-data-table';
import { ModalComponent } from './dtv-bill-check/modal/modal.component';
import { MyTaskHistoryService } from '../shared/services/my-task-history.service';
import { PagerService } from '../shared/services/pager.service';
import { HomePageService } from '../shared/services/home-page.service';
import { DonutChartV1Component } from './donut-chartV1/donut-chartV1.component';
import { WebSocketService } from '../shared/services/web-socket.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormDatatableComponent } from './dynamic-form-datatable/dynamic-form-datatable.component';
import { ViewSummaryv1Component } from './view-summaryv1/view-summaryv1.component';
import { DynamicFormService } from '../shared/services/dynamic-form.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularDateTimePickerModule,
    ToastModule.forRoot(),
    NgbModule.forRoot(),
    FormsModule,
    ChartsModule,
    SharedComponentsModule,
    ChartistModule,
    AngularMultiSelectModule,
    NgbModule,
    DataTableModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    ModalComponent,
    DashboardComponent,
    HomePageComponent,
    DonutChartV1Component,
    DtvBillCheckComponent,
    BarChartComponent,
    DynamicFormComponent,
    DynamicFormDatatableComponent,
    MyTaskHistoryV1Component,
    ViewSummaryv1Component
  ],

  providers: [
    DTVBillCheckService,
    DynamicFormService,
    MyTaskHistoryService,
    PagerService,
    HomePageService,
    WebSocketService
  ]
})
export class DashboardModule {}
