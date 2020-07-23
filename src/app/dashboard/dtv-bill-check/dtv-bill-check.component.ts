import { Validators, FormControl } from "@angular/forms";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnInit, ViewContainerRef, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DTVBillCheckService } from '../../shared/services/dtv-bill-check.service';
import { NgbProgressbarConfig } from "@ng-bootstrap/ng-bootstrap";
import { ToastsManager } from "ng2-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as FileSaver from "file-saver";
// import { ModalComponent } from "./modal/modal.component";
@Component({
  selector: "app-dtv-bill-check",
  templateUrl: "./dtv-bill-check.component.html",
  styleUrls: ["./dtv-bill-check.component.css"],
})
export class DtvBillCheckComponent implements OnInit {
  monthYear : string;
  uploadedFileName:string;
  showModal : boolean;
  dtvBillCheckForm: FormGroup;
  extArray: any;
  uploadStatus: number;
  fileUploadRequest: any[] = [];
  errorMsg: any;
  errorLog: any;
  UploadError: string;
  @ViewChild("content") modalContent: TemplateRef<any>;
  constructor(private toastr: ToastsManager,private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private dtvBillCheckService: DTVBillCheckService,
    config: NgbProgressbarConfig,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    // customize default values of progress bars used by this component tree
    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.type = "success";
  }

  ngOnInit() {
    this.uploadedFileName="Select File";
    this.showModal = false;
    // this.pubsub.$pub("OpenModal_DTVBILLCHECK", undefined);
    this.dtvBillCheckForm = this.fb.group({
      taskName: new FormControl("", [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)]),
      //  yearMonth: new FormControl("", [Validators.required]),
        fileName: new FormControl("", [Validators.required])
    });
 //   this.dtvBillCheckForm.controls.yearMonth.setValue(this.monthYear);
  }
  billCheckingProcessClick() {
   this.validateAllFormFields(this.dtvBillCheckForm);
   if (this.UploadError === undefined && this.dtvBillCheckForm.valid) {
  this.dtvBillCheckService
      .billCheck({
        yearMonth: this.monthYear ? this.monthYear : new Date().getUTCFullYear() + '' +
         ((new Date().getUTCMonth() + 1) < 10 ? '0' : '') + (new Date().getUTCMonth() + 1),
      taskName: this.dtvBillCheckForm.controls.taskName.value,
        fileUploadRequest: this.fileUploadRequest
      })
      .subscribe(data => {
    this.successNavigation();
          // this.router.navigate(['/dashboard/my-task-history']);
      }, err => {
        if (err.errorCode === '200') {
          this.successNavigation();
        } else if ( err.error.payload !== '') {
          if (err.error.payload === 'TASK_EMPTY_FILE') {
            this.toastr.error('Cannot Upload an Empty File');
          } else if (err.error.payload === 'Duplicate Records Available. Check and re upload'){
            this.toastr.error('Duplicate Records Available. Check and re upload');
          } else {
        this.showModal = true;
        this.errorLog = err.error.payload;
        this.errorMsg = err.error.payload;
        this.errorLog = err.error.payload ;
        this.open2(this.modalContent); }
      // this. pubsub.$pub('OpenModal_DTVBILLCHECK', err.error.payload);
    }  else {
      this.toastr.error('Task Initiation Failed');
      }
      });
  }
}
  handleFileInput(event) {
   this. uploadedFileName = event.target.files[0] ?
  (( event.target.files[0].name.length < 20) ?
   event.target.files[0].name
   : event.target.files[0].name.substring(0, 20) + '.....' +
   event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf(".")).toLowerCase())
    :"Select File"
    this.fileUploadRequest.push({
      file: event.target.files[0],
      error: ""
    });
    this.dtvBillCheckForm.controls.fileName.setValue(event.target.files);
       if ( event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf(".")).toLowerCase() !== '.xlsx') {
          this.UploadError = "Invalid File Type";

       } else if ( event.target.files[0].size > 1048576) {
        this.UploadError = "Maximum File Size Exceeded";
       } else {
        this.UploadError = undefined;
       }
 }
  modelChange($event) {
       this.monthYear = $event.year + '' + ($event.month > 9  ? $event.month  : '0' + $event.month);
     //  this.dtvBillCheckForm.controls.yearMonth.setValue(this.monthYear);
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  successNavigation() {
    this.fileUploadRequest = [];
    this.uploadedFileName = "Select File";
    // this.pubsub.$pub("resetMonthYear",true);
    this.showModal = false;
    // this.pubsub.$pub("OpenModal_DTVBILLCHECK", undefined);
    this.dtvBillCheckForm.reset();
    this.toastr.success('Task Initiated Successfully. Visit My Task History to see the status of the task.', null, {toastLife: 10000});
    this.toastr.onClickToast()
   .subscribe( toast => {
     this.router.navigate(['/dashboard/my-task-history']);

   });
  }
  downloadButtonClick() {
    let err = this.errorLog.replace('/,/g', '/n');
    err = err.replace('.', '/n');
    const blob = new Blob([err], {
      type: "text/plain"
    });
    FileSaver.saveAs(blob, "Incorrect_Line_Numbers.txt");
  }
  copy() {
    const val = this.errorLog;
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }
  open2(content) {
    this.modalService.open(content, { windowClass: "dark-modal" });
  }
  }
