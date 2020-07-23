import { MyTaskHistoryNavComponent } from './shared/components/my-task-history-nav/my-task-history-nav.component';
import { MyTaskHistoryService } from './shared/services/my-task-history.service';
import {PubSubService} from './shared/services/pub-sub/pub-sub.service';
import * as $ from 'jquery';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {
  FullComponent,
  BlankComponent,
  NavigationComponent,
  SidebarComponent,
  SpinnerComponent,
  BreadcrumbComponent, AuthInterceptor
} from './shared';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// import { AddCustomerDetailService } from './shared/services/add-customer-detail.service';
// import { DComponent } from './d/d.component';
import {AuthGuard} from './shared/services/auth/auth.guard';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};
import {ChartsModule} from 'ng2-charts';
import {CommonService} from './shared/services/common.service';
import {LoginService} from './shared/services/auth/login.service';
import {BreadcrumbAdjustmentsComponent} from './shared/components/breadcrumb-adjustments/breadcrumb-adjustments.component';
import {DTVBillCheckService} from './shared/services/dtv-bill-check.service';
import {AddModifiedReasonComponent} from './shared/components/common/add-modified-reason/add-modified-reason.component';
import { RoleGuard } from './shared/services/auth/role.guard';
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent, BreadcrumbAdjustmentsComponent,
    MyTaskHistoryNavComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    PerfectScrollbarModule,
    AppRoutingModule
  ]
  , providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},

    // SubscribeManagementService
    // ,
    //  AddCustomerDetailService,
    PubSubService, CommonService, AuthGuard, LoginService, DTVBillCheckService, RoleGuard, MyTaskHistoryService
    // LoginService
  ],schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
],
  bootstrap: [AppComponent]
})
export class AppModule {
}
