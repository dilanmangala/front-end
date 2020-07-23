import { MyTaskHistoryService } from './../../services/my-task-history.service';
import { Component, OnInit, Input } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
@Component({
  selector: 'app-breadcrumb-adjustments',
  templateUrl: './breadcrumb-adjustments.component.html',
  styleUrls: ['./breadcrumb-adjustments.component.css']
})
export class BreadcrumbAdjustmentsComponent implements OnInit {

  fileName: string;
  eventProps: string;
  constructor(
    private myTaskHistoryService: MyTaskHistoryService,
    private router: Router
  ) {}
@Input()url;
  ngOnInit() {
  }
  exportToExcel() {
      //   if (location.hash.split('/')[2] === 'dashboard') {
      //   this.router.navigate(['/dashboard/my-task-history']);
      //   console.log(location.hash);
      // }
      const item = JSON.parse(localStorage.getItem('permission')).find(
        data => data.name === location.hash.split('/')[2]
      );
      if (item) {
        if (item.templateDownloadFormat !== null) {
          const fileNameSplit = this.url.split('.');
          let format = '';
          if (fileNameSplit[fileNameSplit.length - 1] === 'zip') {
            format = 'application/zip';
          } else if (fileNameSplit[fileNameSplit.length - 1] === 'xlsx') {
            format =
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          }
          this.myTaskHistoryService
            .DownloadTemplate(item.url, format)
            .subscribe(data => {
              FileSaver.saveAs(data, item.templateDownloadFormat);
            });
        }
      }
    }
  }

