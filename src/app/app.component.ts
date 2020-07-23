import {ModificationType} from './shared/models/modification-type/modification-type';
// import { ModificationTypeData } from './shared/models/modification-type/modification-type-data';
import {Component, OnInit} from '@angular/core';
// import { OnInit } from 'angular2-pubsub/node_modules/@angular/core';
import {CommonService} from './shared/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public static modificationType: ModificationType[] = [];
  constructor(private commonService: CommonService) {

  }
  // modificationTypeData: ModificationTypeData;
  title = 'app';
  ngOnInit() {
    // this.commonService.GetModificationType().subscribe(
    //   data => {
    //     AppComponent.modificationType = data;
    //   }, error => {
    //   }
    // );
    AppComponent.modificationType = [{id: 1, code: 'department_update'},
      {id: 2, code: 'role_update'},
      {id: 3, code: 'user_update'}];
  }
}
