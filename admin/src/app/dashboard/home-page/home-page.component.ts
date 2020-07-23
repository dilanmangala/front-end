import { LineChartResponse } from './../../shared/models/line-chart/line-chart.response';
import { Component, OnInit, Input } from "@angular/core";
import { HomePageService } from '../../shared/services/home-page.service';
import { HomePageDynamic } from './home-page-dynamic';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from '../../shared';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @Input() roles:any
  barChartData: LineChartResponse;
  donutChartData: any;
  dashboardItems = [];
  homePageDynamicData: { name: string; image: string; url: string }[];
  homeDynamicData: any[] = [];
  classes: any[] = [];
  constructor(private homePageService: HomePageService, private domSanitizer: DomSanitizer,private loginService: LoginService) {}

  ngOnInit() {
    this.loadPermitionMap();
    this.homePageService.GetDynamicDashboardDetails().subscribe(data => {
      this.homePageDynamicData = data;
       localStorage.setItem('permission', JSON.stringify(data));
    });
    this.homePageService.GetAllRecords().subscribe(data => {
      this.barChartData = data;
    });
    this.homePageService.GetErrornousRecords().subscribe(data => {
      this.donutChartData = data;
    });
  }

  private loadPermitionMap() {
    // let roles;
   
    // this.loginService.getAthenticatedUserToken().subscribe(data =>{
    //   roles=data.roleList;
    // })
    this.dashboardItems = this.roles;
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", this.roles)
  }
}
