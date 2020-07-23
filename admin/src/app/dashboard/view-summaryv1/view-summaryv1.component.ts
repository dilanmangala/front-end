import { DynamicFormService } from "./../../shared/services/dynamic-form.service";
import { MyTaskHistoryService } from "./../../shared/services/my-task-history.service";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { taskSummaryDataTableDtvBillCheck } from "./task-summary-data-table";
import { PagerService } from "../../shared/services/pager.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-view-summaryv1",
  templateUrl: "./view-summaryv1.component.html",
  styleUrls: ["./view-summaryv1.component.css"]
})
export class ViewSummaryv1Component implements OnInit, OnChanges {
  taskSummaryDataTable: any;
  formValue: any;
  allItems: any;
  pager: any;
  pagedItems: any;
  dynamicFormData: any;
  dropdown: any;
  dropdownData: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private pagerService: PagerService,
    private myTaskHistoryService: MyTaskHistoryService,
    private dynamicFormService: DynamicFormService
  ) {}
  @Input() stepId: any;
  @Input()
  taskDetail: any;
  @Input() allItemsfromDashboard: any[];

  ngOnInit() {
  }
  
  setPage(page: number) {
    if (this.allItems !== null && this.allItems !== undefined) {
      if (this.allItems) {
        this.pager = this.pagerService.getPager(this.allItems.length, page);
        this.pagedItems = this.allItems.slice(
          this.pager.startIndex,
          this.pager.endIndex + 1
        );
      }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes.allItemsfromDashboard) {
        if (changes.allItemsfromDashboard.currentValue) {
          if (changes.allItemsfromDashboard.currentValue[0]) {
            this.allItems = changes.allItemsfromDashboard.currentValue[0];
            this.setPage(1);
            this.taskSummaryDataTable = taskSummaryDataTableDtvBillCheck;
          }
        }
      }
    }
  }
}
