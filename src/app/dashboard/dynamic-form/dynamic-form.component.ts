import { forEach } from "@angular/router/src/utils/collection";
import { template } from "./temp";
import { DynamicFormService } from "./../../shared/services/dynamic-form.service";
import { TaskSummaryDtvBillChecktemplate } from "./task-summaryDynamicForm";
import { Router, ActivatedRoute } from "@angular/router";
import * as FileSaver from "file-saver";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { ToastsManager } from "ng2-toastr";
@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input("formValue")
  formValue: any[];
  @Input("dynamicFormData") dynamicFormData: any;
  @Input("dropdownData") dropdownData: any;
  temp: any;
  dropdownSettings: {
    singleSelection: boolean;
    text: string;
    selectAllText: string;
    unSelectAllText: string;
    enableSearchFilter: boolean;
    classes: string;
  };
  selectedItems: { id: string; itemName: string }[];
  // isCompletedSelected: boolean | { id: string; itemName: string };
  dropdownList: { id: string; itemName: string }[];
  monthYear: string;
  form: FormGroup;
  dropdown: any;
  uploadedFileList: any[] = [];
  uploadError: {};
  // showModal: boolean;
  @ViewChild("content") modalContent: TemplateRef<any>;
  errorMsg: any;
  errorLog: any;
  headerText: any;
  isDisabled: boolean;
  constructor(
    private activeRoute: ActivatedRoute,
    private toastr: ToastsManager,
    private fb: FormBuilder,
    private router: Router,
    vcr: ViewContainerRef,
    private modalService: NgbModal,
    //  private dtvBillCheckService: DTVBillCheckService,
    private dynamicFormService: DynamicFormService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  dateTime: Date;
  currentDate: { year: number; month: number; day: number };

  ngOnInit() {
    this.form = this.fb.group({});
    this.isDisabled = false;
    this.dateTime = new Date();
    this.currentDate = {
      year: this.dateTime.getUTCFullYear(),
      month: this.dateTime.getUTCMonth() + 1,
      day: this.dateTime.getUTCDate()
    };
    if (!this.uploadError) {
      this.uploadError = {
        name: "error"
      };
    }
    const locationArr = location.hash.split("/");
        this.temp = this.dynamicFormData;
    this.dropdown = this.dropdownData;



    this.form.valueChanges.subscribe(data => {
      this.isDisabled = false;
    });


    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Status",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: false,
      classes: "myclass custom-class"
    };
  }
  onItemSelect(item: any) {
  }
  OnItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }

  modelChange(event) {
    const item = this.temp.templateData.find(
      data => data.controlType === "MonthPicker"
    );
    if (item) {
      this.form
        .get(item.formControlName)
        .setValue(
          event.year + "" + (event.month > 9 ? event.month : "0" + event.month)
        );
    }
    this.monthYear =
      event.year + "" + (event.month > 9 ? event.month : "0" + event.month);
  }

  click(event) {
  }

  handleFileInput(event) {
    if (event.target.files[0]) {
      this.uploadedFileList = this.uploadedFileList.filter(
        item => item.name !== event.target.id
      );
    }
    if (this.uploadError[event.target.id]) {
      delete this.uploadError[event.target.id];
    }
    this.uploadedFileList.push({
      file: event.target.files[0],
      name: event.target.id,
      fileName: event.target.files[0]
        ? event.target.files[0].name.length < 20
          ? event.target.files[0].name
          : event.target.files[0].name.substring(0, 20) +
            "....." +
            event.target.files[0].name
              .substring(event.target.files[0].name.lastIndexOf("."))
              .toLowerCase()
        : "Select File"
    });
    const tempData = this.temp.templateData.find(
      item => item.formControlName === event.target.id
    );
    if (
      event.target.files === undefined &&
      event.target.files[0] === undefined &&
      event.target.files === null &&
      event.target.files[0] === null
    ) {
      this.uploadError[event.target.id] = tempData.errorMessages.required;
    } else if (
      tempData.validations.format.indexOf(
        event.target.files[0].name
          .substring(event.target.files[0].name.lastIndexOf("."))
          .toLowerCase()
      ) < 0
    ) {
      if (event.target.files.length === 0) {
        this.uploadError[event.target.id] = tempData.errorMessages.required;
      } else {
        this.uploadError[event.target.id] = tempData.errorMessages.format;
      }
    } else if (event.target.files[0].size > tempData.validations.max) {
      this.uploadError[event.target.id] = tempData.errorMessages.max;
    } else if (tempData.validations.name !== event.target.files[0].name) {
      this.uploadError[event.target.id] = tempData.errorMessages.name;
    } else {
      this.uploadError[event.target.id] = "";
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control.value === 0) {
          control.setValue = null;
        }
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  actionButtonClick(event) {
    this.isDisabled = true;
    delete this.uploadError["name"];
    const buttonDetail = this.temp.templateData.find(
      item1 => item1.id === event.target.id
    );
    const formData = this.form.value;
    this.validateAllFormFields(this.form);
    let uploadSuccess = true;
    Object.keys(this.uploadError).forEach(item => {
      uploadSuccess =
        this.form.get(item) &&
        (this.uploadError[item] === "" ||
          this.uploadError[item] === null ||
          this.uploadError[item] === undefined);
    });
    if (this.form.valid && uploadSuccess) {
      let url =
        JSON.parse(localStorage.getItem("permission")).find(
          data => data.name === location.hash.split("/")[2]
        ).url + buttonDetail.Serviceurl;
      this.temp.templateData
        .filter(
          item => item.formControlName !== "" && item.inputType !== "file"
        )
        .forEach(function(item, i) {
          if (i === 0) {
            url = url + "?";
          } else {
            url = url + "&";
          }
          
          if (item.controlType === "Calender") {
            url =
              url +
              item.formControlName +
              "=" +
              formData[item.formControlName].year +
              "-" +
              (formData[item.formControlName].month < 10 ? "0" : "") +
              formData[item.formControlName].month +
              "-" +
              (formData[item.formControlName].day < 10 ? "0" : "") +
              formData[item.formControlName].day;
          } else {
            url =
              url + item.formControlName + "=" + formData[item.formControlName];
          }
        });
      this.dynamicFormService
        .billCheck({
          url: url,
          fileUploadRequest: this.uploadedFileList
        })
        .subscribe(
          data => {
            // this.showModal = false;
            this.form.reset();
            this.temp.templateData.forEach(control => {
              if (control.controlType === "Calender") {
                if (control.default === "current") {
                  this.form.get(control.formControlName).setValue({
                    day: this.currentDate.day,
                    month: this.currentDate.month,
                    year: this.currentDate.year
                  });
                }
              }
              if (control.controlType === "MonthPicker") {
                if (control.default === 0) {
                  this.form
                    .get(control.formControlName)
                    .setValue(
                      new Date().getUTCFullYear() +
                        "" +
                        (new Date().getUTCMonth() + 1 < 10 ? "0" : "") +
                        (new Date().getUTCMonth() + 1)
                    );
                }
              } else if (control.controlType === "toggleButton") {
                this.form
                  .get(control.formControlName)
                  .setValue(
                    this.dropdown[control.formControlName].default[0].id
                  );
              } else if (
                control.controlType === "Dropdown" &&
                this.dropdown[control.formControlName].default
              ) {
                if (this.dropdown[control.formControlName].default.length > 0) {
                  this.form
                    .get(control.formControlName)
                    .setValue(
                      this.dropdown[control.formControlName].default[0].id
                    );
                }
              } else if (
                control.controlType === "MultiSelectDropDown" &&
                this.dropdown[control.formControlName].default
              ) { 
                if (this.dropdown[control.formControlName].default.length > 0) {
                  this.form
                    .get(control.formControlName)
                    .setValue(
                      this.dropdown[control.formControlName].default[0].id
                    );
                }
              }
            });
            this.toastr.success(data.description, null, { toastLife: 10000 });
            this.toastr.onClickToast().subscribe(toast => {
              // Fix me: Once the service available hardcoded value should removed
              this.router.navigate(["/dashboard/my-task-history"]);
            });
            this.isDisabled = false;
          },
          err => {
            if (err.error.messageType === "TOAST") {
              // this.showModal = false;
              this.toastr.error(err.error.description);
            } else if (err.error.messageType === "MODAL") {

              this.open2(this.modalContent);
              // this.showModal = true;
              this.headerText = err.error.headerText;

              this.errorLog = err.error.description;
            }
            this.isDisabled = false;
          }
        );
    }
  }
  downloadButtonClick() {
    let err = this.errorLog.replace("/,/g", "/n");
    err = err.replace(".", "/n");
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

  cancelButtonClick(event) {
    const item = this.temp.templateData.find(
      item1 => item1.id === event.target.id
    );
    if (item.Navigateurl !== "") {
      this.router.navigate([item.Navigateurl]);
    } else {
      this.form.reset();
    }
  }
  primaryButtonClick(event) {
    const item = this.temp.templateData.find(
      item1 => item1.id === event.target.id
    );
    if (item.isDownload) {
      let params = "";
      item.serviceInput.forEach(controls => {
        item.serviceInput.indexOf(controls) === 0
          ? (params = params + "?")
          : (params = params + "&");
        params = params + controls + "=" + this.form.get(controls).value;
      });
      
      this.dynamicFormService
        .DownloadDetail(
          item.type.find(
            data => data.name === this.form.get(item.parameter).value
          ).format,
          JSON.parse(localStorage.getItem("permission")).find(
            data =>
              data.description === this.activeRoute.snapshot.params.providerType
          ).url +
            item.serviceurl +
            this.form.get(item.parameter).value +
            params
        )
        .subscribe(res => {
          FileSaver.saveAs(
            res,
            "RoboticProcessAutomation." +
              item.type.find(
                data => data.name === this.form.get(item.parameter).value
              ).ext
          );
        });
    }
  }
  togleClick(event, formControlName) {
    this.form.get(formControlName).setValue(event.target.id);
  }
  onChange(event) {
    const detail = this.temp.dependOn.find(
      data => data.formControlName === event.target.id
    );
    if (detail !== undefined && detail !== null) {
      if (detail.dependancies !== undefined && detail.dependancies !== null) {
        detail.dependancies.forEach(control => {
          // need to hide the control
          if (control.hide.length > 0) {
            if (control.hide.find(item2 => item2 === event.target.value)) {
              this.temp.templateData.find(
                data1 => data1.formControlName === control.formControlName
              ).show = false;
              this.form.removeControl(control.formControlName);
              if (this.uploadError[control.formControlName]) {
                delete this.uploadError[control.formControlName];
              }
            } else {
              this.temp.templateData.find(
                data1 => data1.formControlName === control.formControlName
              ).show = true;
              this.form.addControl(control.formControlName, new FormControl());
            }
          }
          // need  to handle depend on validations
          if (control.validation.length > 0) {
          }
        });
      }
    }

  }
  open2(content) {
    this.modalService.open(content, { windowClass: "dark-modal" });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      // if (this.form) {
      //   this.form = this.fb.group({});
      // }
      if (changes.dropdownData) {
        if (changes.dropdownData.currentValue) {
          if (changes.dropdownData.currentValue[0]) {
            this.dropdown = changes.dropdownData.currentValue[0].description;
          }
        }
      }
      if (changes.formValue) {
        if (changes.formValue.currentValue) {
          if (changes.formValue.currentValue[0]) {
            this.formValue = changes.formValue.currentValue[0];
        }
      }
    }
      if (changes.dynamicFormData) {
        if (changes.dynamicFormData.currentValue) {
          this.temp = changes.dynamicFormData.currentValue[0];
          if (this.temp) {
            if (this.temp.templateData) {
              this.temp.templateData.forEach(item => {
                if (item.formControlName !== "") {
                  if (this.form) {
                  this.form.addControl(
                    item.formControlName,
                    new FormControl(item.default)
                  );

                  if (
                    this.form.get(item.formControlName) !== null &&
                    item.validations !== null
                  ) {
                    this.form
                      .get(item.formControlName)
                      .setValidators([
                        item.validations.min > 0
                          ? Validators.min(item.validations.min)
                          : Validators.min(0),
                        item.validations.minLength > 0
                          ? Validators.minLength(item.validations.minLength)
                          : Validators.minLength(0),
                        item.validations.max > 0
                          ? Validators.max(item.validations.max)
                          : Validators.max(10000000000000),
                        item.validations.maxLength > 0
                          ? Validators.maxLength(item.validations.maxLength)
                          : Validators.maxLength(
                              1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
                            ), Validators.pattern(item.validations.regex),
                        item.validations.required ? Validators.required : null
                      ]);
                    this.form
                      .get(item.formControlName)
                      .updateValueAndValidity();
                    if (item.controlType === "Calender") {
                      if (item.default === "current") {
                        this.form.get(item.formControlName).setValue({
                          day: this.currentDate.day,
                          month: this.currentDate.month,
                          year: this.currentDate.year
                        });
                      }
                    }
                    if (item.controlType === "MonthPicker") {
                      if (item.default === 0) {
                        this.form
                          .get(item.formControlName)
                          .setValue(
                            new Date().getUTCFullYear() +
                              "" +
                              (new Date().getUTCMonth() + 1 < 10 ? "0" : "") +
                              (new Date().getUTCMonth() + 1)
                          );
                      }
                    } else if (item.controlType === "toggleButton" && this.dropdown[item.formControlName]) {
                      this.form
                        .get(item.formControlName)
                        .setValue(
                          this.dropdown[item.formControlName].default[0].id
                        );
                    } else if (
                      item.controlType === "Dropdown" &&
                      this.dropdown[item.formControlName]
                    ) {
                      if (
                        this.dropdown[item.formControlName].default.length > 0
                      ) {
                        this.form
                          .get(item.formControlName)
                          .setValue(
                            this.dropdown[item.formControlName].default[0].id
                          );
                      }
                    }  else if (
                      item.controlType === "MultiSelectDropDown"
                    ) {
                      if (
                        this.dropdown[item.formControlName].default.length > 0
                      ) {
                        this.form
                          .get(item.formControlName)
                          .setValue(
                            this.dropdown[item.formControlName].default[0].id
                          );
                      }
                    }
                  }}
                  if (this.formValue !== null && this.formValue !== undefined && this.form)   {
                    if (this.formValue[item.formControlName]) {
                      if (item.inputType === "date") {
                        const date = this.formValue[item.formControlName].split(
                          "T"
                        );
                        this.form
                          .get(item.formControlName)
                          .setValue(date[0] + " " + date[1].split(".")[0]);
                      } else {
                        this.form
                          .get(item.formControlName)
                          .setValue(this.formValue[item.formControlName]);
                      }
                      const detail = this.temp.dependOn.find(
                        data => data.formControlName === item.formControlName
                      );
                      if (detail !== undefined && detail !== null) {
                        if (
                          detail.dependancies !== undefined &&
                          detail.dependancies !== null
                        ) {
                          detail.dependancies.forEach(control => {
                            // need to hide the control
                            if (control.hide.length > 0) {
                              if (
                                control.hide.find(
                                  item2 =>
                                    item2 ===
                                    this.form.get(item.formControlName).value
                                )
                              ) {
                                this.temp.templateData.find(
                                  data1 =>
                                    data1.formControlName ===
                                    control.formControlName
                                ).show = false;
                              } else {
                                this.temp.templateData.find(
                                  data1 =>
                                    data1.formControlName ===
                                    control.formControlName
                                ).show = true;
                              }
                            }
                            // need  to handle depend on validations
                            if (control.validation.length > 0) {
                            }
                          });
                        }
                      }
                    }
                  }
                }
              });
            }
          }
        }
      }
    }
  }
}
