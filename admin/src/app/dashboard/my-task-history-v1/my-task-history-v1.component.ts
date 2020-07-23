import { stat } from "fs";
import { forEach } from "@angular/router/src/utils/collection";
import { WebSocketService } from "./../../shared/services/web-socket.service";
import { MyTaskHistoryService } from "./../../shared/services/my-task-history.service";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ViewChild
} from "@angular/core";
import {
  Task
  //  PubSubService
} from "../../shared";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { DataTable, DataTableResource } from "angular5-data-table";
import { Router, ActivatedRoute } from "@angular/router";
import { PagerService } from "../../shared/services/pager.service";
import * as jsPDF from "jspdf";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
// import { PubSubEvent } from "../../../environments/pub-sub-event";
import { Observable } from "rxjs/Observable";
import { API_URL } from "../../../environments/api-url";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
@Component({
  selector: "app-my-task-history-v1",
  templateUrl: "./my-task-history-v1.component.html",
  styleUrls: ["./my-task-history-v1.component.css"]
})
export class MyTaskHistoryV1Component implements OnInit {
  // array of all items to be paged
  allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  fileUploadRequest: any;
  regFormUploadError: string;
  extArray: any;
  maxAddedDate: { year: number; month: any; day: any };
  myTaskHistoryForm: FormGroup;
  downloadOption: { name: string; description: string }[];
  isPDF: boolean;
  dataTableData: Task[] = [];
  dataForDropdown: { name: string; description: string }[];
  minCompletedDate: { year: number; month: number; day: number };
  maxCompletedDate: { year: number; month: number; day: number };
  minAddedDate: { year: number; month: number; day: number };
  // minDateBackEnd: { year: number; month: number; day: number };
  maxDateToBackEnd: { year: number; month: number; day: number };
  minDateToBackEnd: { year: number; month: number; day: number };
  currentDate: Date;
  ws: any;
  dropdownList = [];
  selectedItems = [];
  dropdownList1 = [];
  selectedItems1 = [];
  dropdownSettings = {};
  isCompletedSelected: boolean;
  showErrorMsg: boolean;
  dropdownSettings1: {
    singleSelection: boolean;
    text: string;
    selectAllText: string;
    unSelectAllText: string;
    enableSearchFilter: boolean;
    classes: string;
  };
  constructor(
    private activeRoute: ActivatedRoute,
    // private pubsub: PubSubService,
    private fb: FormBuilder,
    private router: Router,
    private webSocketService: WebSocketService,
    private myTaskHistoryService: MyTaskHistoryService,
    private pagerService: PagerService
  ) {}
  @Output()
  nextClick = new EventEmitter();
  @Output()
  resetClick = new EventEmitter();
  @Input()
  stepId: number;
  @Output()
  depName = new EventEmitter();
  @Input()
  taskForm: any;
  @ViewChild(DataTable)
  carsTable: DataTable;

  reload(params) {
    this.initialLoadingData();
  }

  // custom features:
  viewDetailClicked(task) {
    if (task.detailType === "Internal") {
      this.nextClick.emit({
        stepId: this.stepId,
        task: task,
        taskForm: this.myTaskHistoryForm.value
      });
      // this.pubsub.$pub(PubSubEvent.STEPS, 2);
      // this.pubsub.$pub(PubSubEvent.DATA_PASS_TO_STEPPER_CLICK, task);
      this.router.navigate([
        "/dashboard/view-summary/" +
          task.taskId.split("-").pop() +
          "/" +
          task.status +
          "/" +
          task.providerType
      ]);
    } else if (task.detailType === "External") {
    }
  }

  ngOnInit() {
    this.isPDF = true;
    this.dropdownList = [
      {
        id: "COMPLETED",
        itemName: "Completed"
      },
      {
        id: "PENDING",
        itemName: "Pending"
      },
      {
        id: "PROCESSING",
        itemName: "Processing"
      },
      { id: "FAILED", itemName: "Failed" }
    ];

    this.selectedItems = [
      {
        id: "PENDING",
        itemName: "Pending"
      },
      {
        id: "PROCESSING",
        itemName: "Processing"
      }
    ];
    JSON.parse(localStorage.getItem("permission")).forEach(item => {
      //remove me after fix
      // if (item.name === "gsm-bill-check") {
      //   item.name = "GSM";
      // }
      this.dropdownList1.push({ id: item.name, itemName: item.description });
      this.selectedItems1.push({ id: item.name, itemName: item.description });
    });

    // this.selectedItems1 = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Status",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: false,
      classes: "myclass custom-class"
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      text: "Select Process",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: false,
      classes: "myclass custom-class"
    };
    const addedDateFrom = "";
    this.currentDate = new Date();
    this.maxDateToBackEnd = {
      year: this.currentDate.getFullYear(),
      month: this.currentDate.getMonth() + 1,
      day: this.currentDate.getDate()
    };
    this.minDateToBackEnd = {
      year:
        this.currentDate.getMonth() > 6
          ? this.currentDate.getFullYear()
          : this.currentDate.getFullYear() - 1,
      month:
        this.currentDate.getMonth() > 6
          ? this.currentDate.getMonth() - 6
          : 12 - (6 - this.currentDate.getMonth()),
      day: this.currentDate.getDate()
    };
    this.dataForDropdown = [
      {
        name: "COMPLETED",
        description: "Completed"
      },
      {
        name: "PENDING",
        description: "Pending"
      },
      {
        name: "PROCESSSING",
        description: "Processing"
      },
      { name: "FAILED", description: "Failed" }
    ];
    this.initialLoadingData();
    // this.initialLoadingData1();
    this.myTaskHistoryForm = this.fb.group({
      addedDateFrom: new FormControl(""),
      addedDateTo: new FormControl(""),
      completedDateFrom: new FormControl(""),
      completedDateTo: new FormControl(""),
      status: new FormControl([]),
      process: new FormControl([])
    });
    this.myTaskHistoryForm.valueChanges.subscribe(data => {
      if (
        (this.selectedItems !== null && this.selectedItems !== undefined) ||
        (this.myTaskHistoryForm.controls.addedDateFrom !== undefined &&
          this.myTaskHistoryForm.controls.addedDateFrom !== null) ||
        (this.myTaskHistoryForm.controls.addedDateTo !== undefined &&
          this.myTaskHistoryForm.controls.addedDateTo !== null) ||
        (this.myTaskHistoryForm.controls.completedDateFrom !== null &&
          this.myTaskHistoryForm.controls.completedDateFrom !== undefined) ||
        (this.myTaskHistoryForm.controls.completedDateTo !== undefined &&
          this.myTaskHistoryForm.controls.completedDateTo !== null)
      ) {
        this.showErrorMsg = false;
      } else {
        this.showErrorMsg = true;
      }
    });
    this.downloadOption = [
      {
        name: "Excel",
        description: "Excel"
      },
      {
        name: "PDF",
        description: "PDF"
      }
    ];

    this.maxAddedDate = {
      year: this.currentDate.getUTCFullYear(),
      month: this.currentDate.getUTCMonth() + 1,
      day: this.currentDate.getUTCDate()
    };
    this.maxCompletedDate = this.maxAddedDate;

    this.minAddedDate = {
      year:
        this.currentDate.getUTCMonth() > 5
          ? this.currentDate.getUTCFullYear()
          : this.currentDate.getUTCFullYear() - 1,
      month:
        this.currentDate.getUTCMonth() > 5
          ? this.currentDate.getUTCMonth() - 6
          : 12 - (6 - this.currentDate.getUTCMonth()),
      day: this.currentDate.getUTCDate()
    };
    this.minCompletedDate = this.minAddedDate;
    this.myTaskHistoryForm.controls.addedDateFrom.setValue({
      day: this.minDateToBackEnd.day,
      month: this.minDateToBackEnd.month,
      year: this.minDateToBackEnd.year
    });
    this.myTaskHistoryForm.controls.completedDateFrom.setValue({
      day: this.minDateToBackEnd.day,
      month: this.minDateToBackEnd.month,
      year: this.minDateToBackEnd.year
    });
    this.myTaskHistoryForm.controls.addedDateTo.setValue({
      day: this.maxDateToBackEnd.day,
      month: this.maxDateToBackEnd.month,
      year: this.maxDateToBackEnd.year
    });
    this.myTaskHistoryForm.controls.completedDateTo.setValue({
      day: this.maxDateToBackEnd.day,
      month: this.maxDateToBackEnd.month,
      year: this.maxDateToBackEnd.year
    });
    // const addedDateFrom = '';

    if (
      this.myTaskHistoryForm.controls.addedDateFrom !== undefined &&
      this.myTaskHistoryForm.controls.addedDateFrom !== null
    ) {
      this.myTaskHistoryForm.controls.addedDateFrom.valueChanges.subscribe(
        data => {
          if (data !== addedDateFrom && data !== null && data !== undefined) {
            this.minAddedDate = {
              year: this.myTaskHistoryForm.controls.addedDateFrom.value.year,
              month: this.myTaskHistoryForm.controls.addedDateFrom.value.month,
              day: this.myTaskHistoryForm.controls.addedDateFrom.value.day
            };
            this.maxAddedDate = {
              year: this.currentDate.getUTCFullYear(),
              month: this.currentDate.getUTCMonth() + 1,
              day: this.currentDate.getUTCDate()
            };
          }
        }
      );
    }
    const completedDateTo = "";
    // if (
    //   this.myTaskHistoryForm.controls.completedDateTo.value !== undefined &&
    //   this.myTaskHistoryForm.controls.completedDateTo.value !== null
    // ) {
    this.myTaskHistoryForm.controls.completedDateTo.valueChanges.subscribe(
      data => {
        if (completedDateTo !== data && data !== null && data !== undefined) {
          //   completedDateTo = data;
          this.minCompletedDate = {
            year:
              this.currentDate.getUTCMonth() > 5
                ? this.currentDate.getUTCFullYear()
                : this.currentDate.getUTCFullYear() - 1,
            month:
              this.currentDate.getUTCMonth() > 5
                ? this.currentDate.getUTCMonth() - 6
                : 12 - (6 - this.currentDate.getUTCMonth()),
            day: this.currentDate.getUTCDate()
          };
          this.maxCompletedDate = {
            year: data.year,
            month: data.month,
            day: data.day
          };
        }
      }
    );

    const completedDateFrom = "";

    this.myTaskHistoryForm.controls.completedDateFrom.valueChanges.subscribe(
      data => {
        if (data !== completedDateFrom && data !== undefined && data !== null) {
          this.maxCompletedDate = {
            year: this.currentDate.getUTCFullYear(),
            month: this.currentDate.getUTCMonth() + 1,
            day: this.currentDate.getUTCDate()
          };
          this.minCompletedDate = {
            year: data.year,
            month: data.month,
            day: data.day
          };
        }
      }
    );
    // }
    if (
      this.myTaskHistoryForm.controls.addedDateTo.value !== undefined &&
      this.myTaskHistoryForm.controls.addedDateTo.value !== null
    ) {
      this.myTaskHistoryForm.controls.addedDateTo.valueChanges.subscribe(
        data => {
          if (data !== null && data !== undefined) {
            this.maxAddedDate = {
              year: this.myTaskHistoryForm.controls.addedDateTo.value.year,
              month: this.myTaskHistoryForm.controls.addedDateTo.value.month,
              day: this.myTaskHistoryForm.controls.addedDateTo.value.day
            };
            this.minAddedDate = {
              year:
                this.currentDate.getUTCMonth() > 5
                  ? this.currentDate.getUTCFullYear()
                  : this.currentDate.getUTCFullYear() - 1,
              month:
                this.currentDate.getUTCMonth() > 5
                  ? this.currentDate.getUTCMonth() - 6
                  : 12 - (6 - this.currentDate.getUTCMonth()),
              day: this.currentDate.getUTCDate()
            };
          }
        }
      );
    }

    //TODO: use this code and reomve this.initializeWebSocketConnection() function
    // this.webSocketService.initializeWebSocketConnection().subscribe(data => {
    //   console.log('Data Data Data 111111');
    //   if(data) {
    //     console.log('Data Data Data' + data);
    //   } else {
    //     console.log('No Data MTH');
    //   }
    // });
  }

  download() {
    let status = "";
    let providerType = "";
    if (this.selectedItems !== undefined && this.selectedItems !== null) {
      if (this.selectedItems.length > 0) {
        this.selectedItems.forEach(item => {
          if (status !== "") {
            status = status + ",";
          }
          status = status + item.id;
        });
      }
    } else {
      this.dropdownList.forEach(item => {
        if (status !== "") {
          status = status + ",";
        }
        status = status + item.id;
      });
    }
    if (this.selectedItems1 !== null && this.selectedItems1 !== undefined && this.selectedItems1!==[] && this.selectedItems1.length > 0) {
        this.selectedItems1.forEach(item => {
          if (providerType !== "") {
            providerType = providerType + ",";
          }
          providerType = providerType + item.id;
        });
    } else {
      this.dropdownList1.forEach(item => {
        if (providerType !== "") {
          providerType = providerType + ",";
        }
        providerType = providerType + item.id;
      });
    }
    const addedFromDate =
      this.myTaskHistoryForm.controls.addedDateFrom.value !== null &&
      this.myTaskHistoryForm.controls.addedDateFrom.value !== undefined
        ? this.myTaskHistoryForm.controls.addedDateFrom.value.year +
          "-" +
          (this.myTaskHistoryForm.controls.addedDateFrom.value.month > 9
            ? ""
            : "0") +
          this.myTaskHistoryForm.controls.addedDateFrom.value.month +
          "-" +
          (this.myTaskHistoryForm.controls.addedDateFrom.value.day > 9
            ? ""
            : "0") +
          this.myTaskHistoryForm.controls.addedDateFrom.value.day
        : "";
    const addedToDate =
      this.myTaskHistoryForm.controls.addedDateTo.value !== null &&
      this.myTaskHistoryForm.controls.addedDateTo.value !== undefined
        ? this.myTaskHistoryForm.controls.addedDateTo.value !== undefined
          ? this.myTaskHistoryForm.controls.addedDateTo.value.year +
            "-" +
            (this.myTaskHistoryForm.controls.addedDateTo.value.month>9?'':'0')
             + this.myTaskHistoryForm.controls.addedDateTo.value.month +
            "-" + (this.myTaskHistoryForm.controls.addedDateTo.value.day>9 ? '' :'0')
            + this.myTaskHistoryForm.controls.addedDateTo.value.day
          : ""
        : "";
    const completedFromDate =
      this.myTaskHistoryForm.controls.completedDateFrom.value !== null &&
      this.myTaskHistoryForm.controls.completedDateFrom.value !== undefined
        ? this.myTaskHistoryForm.controls.completedDateFrom.value.year +
          "-" +
          (this.myTaskHistoryForm.controls.completedDateFrom.value.month>9?"":"0")+
            this.myTaskHistoryForm.controls.completedDateFrom.value.month +
          "-" +(this.myTaskHistoryForm.controls.completedDateFrom.value.day>9?"":"0") +
          this.myTaskHistoryForm.controls.completedDateFrom.value.day
        : "";

    const completedToDate =
      this.myTaskHistoryForm.controls.completedDateTo.value !== undefined &&
      this.myTaskHistoryForm.controls.completedDateTo.value !== null
        ? this.myTaskHistoryForm.controls.completedDateTo.value.year +
          "-" +
          (this.myTaskHistoryForm.controls.completedDateTo.value.month>9 ? "" :"0")
          + this.myTaskHistoryForm.controls.completedDateTo.value.month +
          "-" +
          (this.myTaskHistoryForm.controls.completedDateTo.value.day>9 ? "" :"0") +
          this.myTaskHistoryForm.controls.completedDateTo.value.day
        : "";
    if (this.isPDF) {
      this.downLoadPDF(
        status,
        providerType,
        addedFromDate,
        addedToDate,
        completedFromDate,
        completedToDate
      );
    } else {
      this.downloadExcel(
        status,
        providerType,
        addedFromDate,
        addedToDate,
        completedFromDate,
        completedToDate
      );
    }
  }

  downloadExcel(
    status,
    providerType,
    addedFromDate,
    addedToDate,
    completedFromDate,
    completedToDate
  ) {
    this.myTaskHistoryService
      .download({
        format:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        urlExt: "History_Excel",
        status: status,
        addedFromDate: addedFromDate,
        addedToDate: addedToDate,
        completedFromDate: completedFromDate,
        completedToDate: completedToDate,
        providerType: providerType
      })
      .subscribe(
        res => {
          // this.loading = false;
          // console.log('download', res);
          FileSaver.saveAs(res, "RoboticProcessAutomation.xlsx");
        },
        er => {
          // this.loading = false;
          //this.toastr.error('Error! Your request cannot proceed, please try again');
        }
      );
  }

  downLoadPDF(
    status,
    providerType,
    addedFromDate,
    addedToDate,
    completedFromDate,
    completedToDate
  ) {
    this.myTaskHistoryService
      .download({
        format: "application/pdf",
        urlExt: "History_pdf",
        status: status,
        addedFromDate: addedFromDate,
        addedToDate: addedToDate,
        completedFromDate: completedFromDate,
        completedToDate: completedToDate,
        providerType: providerType
      })
      .subscribe(
        res => {
          // this.loading = false;
          // console.log('download', res);
          FileSaver.saveAs(res, "RoboticProcessAutomation.pdf");
        },
        er => {
          // this.loading = false;
          //this.toastr.error('Error! Your request cannot proceed, please try again');
        }
      );
  }

  rowTooltip(item) {
    return item.year;
  }

  togleClick(val) {
    this.isPDF = val === 1;
  }
  initialLoadingData() {
    this.allItems = [];
    let providerTypes = "";
    if (this.selectedItems1 !== null && this.selectedItems1 !== undefined) {
      this.selectedItems1.forEach(item => {
        if (providerTypes !== "") {
          providerTypes = providerTypes + ",";
        }
        providerTypes = providerTypes + item.id;
      });
    } else if (
      this.dropdownList1 !== null &&
      this.dropdownList1 !== undefined
    ) {
      this.dropdownList1.forEach(item => {
        if (providerTypes !== "") {
          providerTypes = providerTypes + ",";
        }
        providerTypes = providerTypes + item.id;
      });
    }
    const fromDate =
    this.minDateToBackEnd.year +
    "-" +
   ( this.minDateToBackEnd.month>9?"":"0")+this.minDateToBackEnd.month+
    "-" +( this.minDateToBackEnd.day>9?"":"0") +
    this.minDateToBackEnd.day;

  const toDate =
    this.maxDateToBackEnd.year +
    "-" +( this.maxDateToBackEnd.month>9?"":"0")+
    this.maxDateToBackEnd.month +
    "-" +( this.maxDateToBackEnd.day>9?"":"0") +
    this.maxDateToBackEnd.day;
    this.myTaskHistoryService
      .GetTaskHistory({
        status: "PENDING,PROCESSING",
        providerTypes: providerTypes,
        addedFromDate:fromDate,
        addedToDate: toDate,
        completedFromDate:
        fromDate,
        completedToDate:toDate
      })
      .subscribe(
        data => {
          this.dataTableData = data;
          //this.setPage(1);
          this.allItems = this.dataTableData;
          this.setPage(1);
          this.initializeWebSocketConnection(data);
          // initialize to page 1
        },
        err => {}
      );
    //this.initializeWebSocketConnection();
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

  //#region filter
  filter() {
    if (
      (this.selectedItems !== null && this.selectedItems !== undefined) ||
      (this.myTaskHistoryForm.controls.addedDateFrom.value !== undefined &&
        this.myTaskHistoryForm.controls.addedDateFrom.value !== null) ||
      (this.myTaskHistoryForm.controls.addedDateTo.value !== undefined &&
        this.myTaskHistoryForm.controls.addedDateTo.value !== null) ||
      (this.myTaskHistoryForm.controls.completedDateFrom.value !== null &&
        this.myTaskHistoryForm.controls.completedDateFrom.value !==
          undefined) ||
      (this.myTaskHistoryForm.controls.completedDateTo.value !== undefined &&
        this.myTaskHistoryForm.controls.completedDateTo.value !== null) ||
      (this.selectedItems1 !== null && this.selectedItems1 !== undefined)
    ) {
      status = "";
      this.allItems = [];
      if (this.selectedItems !== null && this.selectedItems !== undefined && this.selectedItems!==[] && this.selectedItems.length > 0) {
        this.selectedItems.forEach(item => {
          if (status !== "") {
            status = status + ",";
          }
          status = status + item.id;
          // if (item.id === "Pending") {
          //   status = status + "PENDING";
          // } else if (item.id === "Processing") {
          //   status = status + "PROCESSING";
          // } else if (item.id === "Completed") {
          //   status = status + "COMPLETED";
          // }
        });
      }
      let providerTypes = "";
      if (this.selectedItems1 !== null && this.selectedItems1 !== undefined && this.selectedItems1!==[] && this.selectedItems1.length > 0) {
        this.selectedItems1.forEach(item => {
          if (providerTypes !== "") {
            providerTypes = providerTypes + ",";
          }
          providerTypes = providerTypes + item.id;
        });
      } else if (
        this.dropdownList1 !== null &&
        this.dropdownList1 !== undefined
      ) {
        this.dropdownList1.forEach(item => {
          if (providerTypes !== "") {
            providerTypes = providerTypes + ",";
          }
          providerTypes = providerTypes + item.id;
        });
      }
      this.myTaskHistoryService
        .GetTaskHistory({
          status: status,
          providerTypes: providerTypes,
          addedFromDate:
            this.myTaskHistoryForm.controls.addedDateFrom.value !== null &&
            this.myTaskHistoryForm.controls.addedDateFrom.value !== undefined
              ? this.myTaskHistoryForm.controls.addedDateFrom.value.year +
                "-" +
                (this.myTaskHistoryForm.controls.addedDateFrom.value.month>9 ? "" :"0") +
                this.myTaskHistoryForm.controls.addedDateFrom.value.month +
                "-" +
                (this.myTaskHistoryForm.controls.addedDateFrom.value.day>9 ? "" :"0") +
                this.myTaskHistoryForm.controls.addedDateFrom.value.day
              : "",

          addedToDate:
            this.myTaskHistoryForm.controls.addedDateTo.value !== null &&
            this.myTaskHistoryForm.controls.addedDateTo.value !== undefined
              ? this.myTaskHistoryForm.controls.addedDateTo.value !== undefined
                ? this.myTaskHistoryForm.controls.addedDateTo.value.year +
                  "-" +
                (this.myTaskHistoryForm.controls.addedDateTo.value.month>9 ? "" :"0") +
                  this.myTaskHistoryForm.controls.addedDateTo.value.month +
                  "-" +
                  (this.myTaskHistoryForm.controls.addedDateTo.value.day>9 ? "" :"0") +
                  this.myTaskHistoryForm.controls.addedDateTo.value.day
                : ""
              : "",

          completedFromDate:
            this.myTaskHistoryForm.controls.completedDateFrom.value !== null &&
            this.myTaskHistoryForm.controls.completedDateFrom.value !==
              undefined
              ? this.myTaskHistoryForm.controls.completedDateFrom.value.year +
                "-" +
                (this.myTaskHistoryForm.controls.completedDateFrom.value.month>9 ? "" :"0") +
                this.myTaskHistoryForm.controls.completedDateFrom.value.month +
                "-" +
                (this.myTaskHistoryForm.controls.completedDateFrom.value.day>9 ? "" :"0") +
                this.myTaskHistoryForm.controls.completedDateFrom.value.day
              : "",

          completedToDate:
            this.myTaskHistoryForm.controls.completedDateTo.value !==
              undefined &&
            this.myTaskHistoryForm.controls.completedDateTo.value !== null
              ? this.myTaskHistoryForm.controls.completedDateTo.value.year +
                "-" +
                (this.myTaskHistoryForm.controls.completedDateTo.value.month>9 ? "" :"0") +
                this.myTaskHistoryForm.controls.completedDateTo.value.month +
                "-" +
                (this.myTaskHistoryForm.controls.completedDateTo.value.day>9 ? "" :"0") +
                this.myTaskHistoryForm.controls.completedDateTo.value.day
              : ""
        })
        .subscribe(data => {
          this.allItems = data;
          this.setPage(1);
          this.initializeWebSocketConnection(data);
        });
    } else {
      this.showErrorMsg = true;
    }
  }

  //#endregion

  clear() {
    this.isCompletedSelected = false;
    this.myTaskHistoryForm.reset();
    this.maxAddedDate = {
      year: this.currentDate.getUTCFullYear(),
      month: this.currentDate.getUTCMonth() + 1,
      day: this.currentDate.getUTCDate()
    };
    this.minAddedDate = {
      year:
        this.currentDate.getUTCMonth() > 5
          ? this.currentDate.getUTCFullYear()
          : this.currentDate.getUTCFullYear() - 1,
      month:
        this.currentDate.getUTCMonth() > 5
          ? this.currentDate.getUTCMonth() - 6
          : 12 - (6 - this.currentDate.getUTCMonth()),
      day: this.currentDate.getUTCDate()
    };
    this.allItems = [];
    let providerTypes = "";
    if (this.dropdownList1 !== null && this.dropdownList1 !== undefined) {
      this.dropdownList1.forEach(item => {
        if (providerTypes !== "") {
          providerTypes = providerTypes + ",";
        }
        providerTypes = providerTypes + item.id;
      });
    } else if (
      this.dropdownList1 !== null &&
      this.dropdownList1 !== undefined
    ) {
      this.dropdownList1.forEach(item => {
        if (providerTypes !== "") {
          providerTypes = providerTypes + ",";
        }
        providerTypes = providerTypes + item.id;
      });
    }
    
    this.myTaskHistoryService
      .GetTaskHistory({
        status: "COMPLETED,PENDING,PROCESSING",
        providerTypes: providerTypes,
        addedFromDate:
          this.minDateToBackEnd.year +
          "-" +
          this.minDateToBackEnd.month +
          "-" +
          this.minDateToBackEnd.day,

        addedToDate:
          this.maxDateToBackEnd.year +
          "-" +
          this.maxDateToBackEnd.month +
          "-" +
          this.maxDateToBackEnd.day,

        completedFromDate:
          this.minDateToBackEnd.year +
          "-" +
          this.minDateToBackEnd.month +
          "-" +
          this.minDateToBackEnd.day,

        completedToDate:
          this.maxDateToBackEnd.year +
          "-" +
          this.maxDateToBackEnd.month +
          "-" +
          this.maxDateToBackEnd.day
      })
      .subscribe(data => {
        this.dataTableData = data;
        this.allItems = data;
        this.setPage(1);
        //     this.allItems = this.dataTableData.filter(data1 =>
        //     data1.status === "JP" ||
        //     data1.status === "JM" ||
        //     data1.status === "PENDING" ||
        //     data1.status === "PROCESSING" ||
        //     data1.status === "COMPLETED"
        // );
      });
  }
  onItemSelect(item: any) {
    this.isCompletedSelected =
      this.selectedItems.length === 0 ||
      this.selectedItems.find(item1 => item1.id === "COMPLETED");
  }
  OnItemDeSelect(item: any) {
    this.isCompletedSelected =
      this.selectedItems.length === 0 ||
      this.selectedItems.find(item1 => item1.id === "COMPLETED");
  }
  onSelectAll(items: any) {
    this.isCompletedSelected =
      this.selectedItems.length === 0 ||
      this.selectedItems.find(item1 => item1.id === "COMPLETED");
  }
  onDeSelectAll(items: any) {
    this.isCompletedSelected =
      this.selectedItems.length === 0 ||
      this.selectedItems.find(item1 => item1.id === "COMPLETED");
  }
  initializeWebSocketConnection(all: any) {
    let wsu = new SockJS(API_URL.DTVBILLCHECK + "/analytics", "echo-protocol");
    this.ws = Stomp.over(wsu);
    let that = this;
    this.ws.connect(
      {},
      function(frame) {
        that.ws.subscribe(
          "/taskProgress/" + localStorage.getItem("userName"),
          function(message) {
            let data = JSON.parse(message.body);
            let per = (data["completedCount"] * 100) / data["recordCount"];
            for (const item of all) {
              if (item.taskId == data["id"]) {
                item.recordCount = data["recordCount"];
                item.successCount = data["completedCount"];
              }
            }
          }
        );
        // that.disabled = true;
      },
      function(error) {
        console.error("STOMP error " + error);
      }
    );
    return "";
  }
  DownloadClicked(item) {
    let  applictionType = ''
    if(item.downloadType === 'zip') {
      applictionType =  "application/zip"
    } else if(item.downloadType === 'xlsx') {
        applictionType =  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    this.myTaskHistoryService
      .DownloadDetail(
        applictionType,
        JSON.parse(localStorage.getItem("permission")).find(
          data =>
            data.description === item.providerType
        ).url,
        item.taskId.split('-').pop()
      )
      .subscribe(data => {
        FileSaver.saveAs(data, item.providerType + ' - Result.' +  item.downloadType);
      });
  }
}
