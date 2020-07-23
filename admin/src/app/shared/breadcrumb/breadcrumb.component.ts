import { Permission } from "./../models/create-user-role/permission";
import { Component, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  @Input() layout;
  pageInfo;
  isDTVBillcheck: boolean;
  eventProps: any;
  permission: any;
  url: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(event => {
        this.url = '';
        this.isDTVBillcheck = false;
        this.permission = '';
        if(JSON.parse(localStorage.getItem('permission'))){
        this.permission = JSON.parse(localStorage.getItem('permission')).find(
          data => data.name === location.hash.split('/')[2]
        );
      }
        if (event['title'] === 'Default' && this.permission !== ''  &&  this.permission !== undefined && this.permission !==null) {
          if (
            this.permission.templateDownloadFormat !== null &&
            this.permission.templateDownloadFormat !== undefined
          ) {
            this.eventProps = '';
            this.url = this.permission.templateDownloadFormat;
          }
          this.titleService.setTitle(this.permission.description);
           this.eventProps = '';
          this.isDTVBillcheck =
            this.permission.templateDownloadFormat !== null &&
            this.permission.templateDownloadFormat !== undefined &&
            this.eventProps !== 'dashboard' &&
            location.hash.split('/')[2] !== 'my-task-history' &&
            location.hash.split('/')[2]  !== 'view-summary';
          this.pageInfo = {
            title: this.permission.description,
            urls: [
              { title: 'Home', url: '/dashboard/dashboard' },
              { title: this.permission.description, url: '' }
            ]
          };
        } else {
          this.isDTVBillcheck = !event.props && location.hash.split('/')[2] !== 'my-task-history' &&
          location.hash.split('/')[2]  !== 'view-summary';
          this.titleService.setTitle(event['title']);
          this.pageInfo = event;
          this.eventProps = event.props;
        }
      });
  }
  ngOnInit() {}

}
