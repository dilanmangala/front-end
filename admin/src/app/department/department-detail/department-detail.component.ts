import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {PubSubEvent} from '../../../environments/pub-sub-event';
import {PubSubService} from './../../shared/services/pub-sub/pub-sub.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import {DepartmentService} from '../../shared/services/department.service';
import {Department, DepartmentRequest} from '../../shared';
import {AppComponent} from '../../app.component';
import {isMaster} from 'cluster';
import {PermissionComponent} from '../../shared/components/permission/permission.component';
import {AddModifiedReasonComponent} from '../../shared/components/common/add-modified-reason/add-modified-reason.component';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  @Input() stepId = 2;
  @Input() incomingData;
  @Output() isModify = false;
  data: Department[] = [];
  showError = false;
  departmentName: string;
  isCreateDepartment: boolean;
  isUpdatButtonClicked: boolean;
  isUpdateDepartment: boolean;
  modifiedCheckboxFormData: any;
  modificationTypeId: any;
  addedReasonToModify: any;
  departmentDetailForm: FormGroup;
  selectedReason: string;
  selectedList: Department[] = [];
  dataList: Department[] = [];
  @ViewChild(PermissionComponent) appPermission: PermissionComponent;
  @ViewChild(AddModifiedReasonComponent) modify: AddModifiedReasonComponent;

  constructor(
    private toastr: ToastsManager,
    private departmentService: DepartmentService,
    private fb: FormBuilder
    // private pubsub: PubSubService
  ) {
  }

  ngOnInit() {
    this.isCreateDepartment = location.hash === '#/department/add-department';
    this.isUpdatButtonClicked = false;
    this.isUpdateDepartment =
      location.hash === '#/department/manage-department';
    // this.pubsub.$sub(PubSubEvent.DEPARTMENT_SEARCH_DEPARTMENT_NAME, data => {
    //   this.departmentName = data;
    // });


    this.departmentDetailForm = this.fb.group({
      departmentName: new FormControl('', [Validators.required]),
      reasonSelect: new FormControl([Validators.required]),
      reason: new FormControl([Validators.required])
    });
    this.departmentName = this.incomingData;
    this.loadPermissionData();
  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  submit() {
    if (this.isCreateDepartment) {
      this.validateAllFormFields(this.departmentDetailForm);
    }
    if (this.isUpdateDepartment && !this.isUpdatButtonClicked) {
      this.modificationTypeId = AppComponent.modificationType.find(x => x.code == 'department_update').id;
      this.isUpdatButtonClicked = true;
      this.appPermission.isUpdateClicked = this.isUpdatButtonClicked;
      this.isModify = true;
    } else {
      if (this.appPermission.selectedPermissions.length > 0) {
        let chileds: Department[] = [];

        chileds = this.appPermission.selectedPermissions;
        if (this.isCreateDepartment && this.departmentDetailForm.valid) {
          this.departmentService
            .AddDepartment({
              name: this.departmentDetailForm.controls.departmentName.value,
              // modifiedReason: '',
              permission: chileds
            })
            .subscribe(
              data => {
                this.toastr.success('Department Created Successfully.');
              },
              err => {
                if (err.error) {
                  if (err.error === '409 Conflict') {
                    this.toastr.error('Department Already Exist');
                  } else {
                    this.toastr.error(err.error);
                  }
                } else {
                  this.toastr.error(err);
                }
              }
            );
        }
        if (this.modify.reason) {
          if (this.isUpdateDepartment && this.incomingData) {
            this.departmentService.UpdateDepartment({
              name: this.departmentName,
              modifiedReason: this.modify.reason,
              permission: chileds
            }).subscribe(data => {
              this.isUpdatButtonClicked = false;
              this.appPermission.isUpdateClicked = false;
              this.toastr.success('Department Updated Successfully');
            }, err => {
              this.toastr.error(err);
            });
          } else {
            this.showError = true;
          }
        } else {
          this.modify.fireSubmit();
          // this.toastr.error('Modify Reason Required');
        }
      } else {
        this.toastr.error('Please add the related permissions for the department');
      }
    }
  }

  cancel() {
    this.loadPermissionData();
    if (this.isUpdateDepartment) {
      this.isUpdatButtonClicked = false;
      // this.pubsub.$pub('Stepper_IsAnyThingModified', false);
      this.appPermission.isUpdateClicked = false;
      this.isModify = false;
    } else if (this.isCreateDepartment) {
      this.departmentDetailForm.reset();
      // this.pubsub.$pub(PubSubEvent.Clear_Checkbox_Table_Form, 'Cancel_Button_Click');
    }
  }

  private loadPermissionData() {
    this.departmentService.GetRolesPermission().subscribe(
      data1 => {
        this.dataList = data1;

        if (this.isUpdateDepartment) {
          this.departmentService.GetPermissionListByDepartmentId(this.departmentName).subscribe(
            data2 => {
              this.selectedList = data2;
              this.appPermission.loadPermissionTree(this.dataList, this.selectedList);
            });
        } else {
          this.selectedList = [];
          this.appPermission.loadPermissionTree(this.dataList, this.selectedList);
        }
      });
  }
}
