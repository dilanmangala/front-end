import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../shared/services/pager.service';

@Component({
  selector: 'app-dynamic-form-datatable',
  templateUrl: './dynamic-form-datatable.component.html',
  styleUrls: ['./dynamic-form-datatable.component.css']
})
export class DynamicFormDatatableComponent implements OnInit {
  pager: any;
  allItems: any;
  pagedItems: any;

  constructor(private pagerService: PagerService) { }

  ngOnInit() {
  }
  reload(event) {

  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );

  }
}
