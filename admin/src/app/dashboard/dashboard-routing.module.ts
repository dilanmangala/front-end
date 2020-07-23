import { DashboardComponent } from "./dashboard.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ViewSummaryv1Component } from "./view-summaryv1/view-summaryv1.component";
const route: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: HomePageComponent,
        data: {
          props: "dashboard",
          title: "Home",
          urls: [
            {
              title: "",
              props: "dashboard"
            }
          ]
        }
      },
      {
        path: 'my-task-history',
        component: DashboardComponent,
        data: {
          title: 'My Task History',
          urls: [
            {
              title: 'Home',
              url: '/dashboard/dashboard'
            },
            { title: 'My Task History', url: '' }
          ]
        }
      },
      {
        path: 'view-summary/:id/:status/:providerType',
        component: DashboardComponent,
        data: {
          title: 'Task Summary',
          urls: [
            {
              title: 'Home',
              url: '/dashboard/dashboard'
            },
            { title: 'Task Summary', url: '' }
          ]
        }
      },
      {
        path: 'testing',
        component: DashboardComponent,
        data: {
          title: 'Task Summary',
          urls: [
            {
              title: 'Home',
              url: '/dashboard/dashboard'
            },
            { title: 'Task Summary', url: '' }
          ]
        }
      },
      {
        path: 'view-summary-v1',
        component: ViewSummaryv1Component,
        data: {
          title: 'Task Summary',
          urls: [
            {
              title: 'Home',
              url: '/dashboard/dashboard'
            },
            { title: 'Task Summary', url: '' }
          ]
        }
      },
      // {
      //   path: 'my-task-history-v1',
      //   component: MyTaskHistoryV1Component,
      //   data: {
      //     title: 'Task Summary',
      //     urls: [
      //       {
      //         title: 'Home',
      //         url: '/dashboard/dashboard'
      //       },
      //       { title: 'Task Summary', url: '' }
      //     ]
      //   }
      // },
      {
        path: '**',
        component: DashboardComponent,
        data: {
          title:"Default"
        }
      }
    ]
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(route)]
})
export class DashboardRoutingModule {}
