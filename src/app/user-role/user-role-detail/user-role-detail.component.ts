import {Restriction} from './../../shared/models/create-user-role/restriction';
import 'rxjs/Rx';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DepartmentService} from '../../shared/services/department.service';
import {CommonService} from '../../shared/services/common.service';
import {PubSubEvent} from '../../../environments/pub-sub-event';
import {PubSubService} from '../../shared/services/pub-sub/pub-sub.service';
import {NullAstVisitor} from '@angular/compiler';
import {Department, Permission} from '../../shared';
import {ToastModule, ToastsManager} from 'ng2-toastr';
import {PermissionComponent} from '../../shared/components/permission/permission.component';
import {TreeviewItem} from 'ngx-treeview';
import {AppConstent} from '../../../environments/app-constent';
import {API_URL} from '../../../environments/api-url';
import {AppComponent} from '../../app.component';
import {AddModifiedReasonComponent} from '../../shared/components/common/add-modified-reason/add-modified-reason.component';
import {forEach} from '@angular/router/src/utils/collection';
import {difference} from 'ngx-dual-listbox/model/set';

@Component({
  selector: 'app-user-role-detail',
  templateUrl: './user-role-detail.component.html',
  styleUrls: ['./user-role-detail.component.css']
})
export class UserRoleDetailComponent implements OnInit {
  @Input() stepId = 2;
  @Input() incomingData;
  // data: Department[] = [];

  userRoleDetailForm: FormGroup;
  tabList: { id: number; index: string; name: string }[];
  dataForDropdown: any[] = [];
  dataToSelect: any[] = [];
  loginData: any;
  isLoginTimeRestriction: boolean;
  permissionData: any;
  initialLoadingData: any;
  isupdateButtonClicked: boolean;
  isCreate: boolean;
  isManage: boolean;
  setRole = '';
  userRoleForDropdown: any[] = [];
  roleName: any;
  modificationTypeId: number;

  selectedList: Department[] = [];
  dataList: Department[] = [];
  @ViewChild(PermissionComponent) appPermission: PermissionComponent;
  @ViewChild(AddModifiedReasonComponent) modify: AddModifiedReasonComponent;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private commonService: CommonService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.isupdateButtonClicked = false;
    this.isCreate = location.hash === '#/user-role/add-user-role';
    this.isManage = location.hash === '#/user-role/manage-user-role';
    this.commonService.GetJSON().subscribe(data => {
      this.dataToSelect = data;
    });

    this.userRoleDetailForm = this.fb.group({
      roleName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      department: new FormControl('', Validators.required),
      // status: new FormControl('', Validators.required)
    });

    this.userRoleDetailForm.addControl('', this.fb.group({
      reasonSelect: '',
      reason: [Validators.required]
    }));

    if (this.isCreate) {
      this.userRoleDetailForm.enable();
      this.userRoleDetailForm.reset();
    } else if (this.isManage && !this.isupdateButtonClicked) {
      this.userRoleDetailForm.disable();
    }
    let departmentChangedValue = this.userRoleDetailForm.get('department').value;
    this.userRoleDetailForm.get('department').valueChanges.subscribe(
      data1 => {
        if (departmentChangedValue !== data1 && data1) {
          departmentChangedValue = data1;
          this.loadPermissionData();
        }
      }
    );

    this.departmentService.GetDepartment().subscribe(data => {
      this.dataForDropdown = data;
    });

    if (!this.isCreate && !this.isupdateButtonClicked) {
      this.loadPermissionData();
    }
    this.tabList = [
      {
        id: 0,
        index: 'PCAT_USER_TYPE',
        name: 'User Type'
      },
      {
        id: 1,
        index: 'PCAT_TRANSACTION_TYPE',
        name: 'Transaction Type'
      },
      {
        id: 2,
        index: 'PCAT_CONFIGURATION',
        name: 'Configuaration'
      },
      {
        id: 3,
        index: 'PCAT_FINANCE',
        name: 'Finance'
      },
      {
        id: 4,
        index: 'PCAT_REPORT',
        name: 'Report'
      }
    ];

    // this.pubsub.$sub(PubSubEvent.USERROLE_SEARCH_DEPARTMENT_NAME, data => {
    //   if (this.isManage) {
    //     this.userRoleDetailForm.controls.department.setValue(data.department);
    //     this.userRoleDetailForm.controls.roleName.setValue(data.roleData);
    //     this.roleName = data.roleName;
    //     Object.keys(this.userRoleDetailForm.controls).forEach(element => {
    //       this.userRoleDetailForm.get(element).disable();
    //     });
    //   }
    // });

    // this.pubsub.$sub('UserRoleLoginTimeDataChanges', data => {
    //   this.loginData = data;
    // });
    // this.pubsub.$sub('CheckboxTableForm_Modified', data => {
    //   this.permissionData = data;
    // });
  }

  loginTimeRestrictionTogleClick(data) {
    this.isLoginTimeRestriction = data === 'Yes';
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

  register() {
    this.validateAllFormFields(this.userRoleDetailForm);
    if (this.isManage && !this.isupdateButtonClicked) {
      this.modificationTypeId = AppComponent.modificationType.find(x => x.code == 'role_update').id;
      this.userRoleDetailForm.enable();
      this.isupdateButtonClicked = true;
      this.appPermission.isUpdateClicked = this.isupdateButtonClicked;
    } else {
      if ((this.isCreate && this.userRoleDetailForm.valid) || !this.isCreate) {
        const restrictionDtos: Restriction[] = [];
        const permission: Permission[] = [];

        if (this.appPermission.selectedPermissions.length > 0) {
          if (this.isCreate) {

            const chileds: Permission[] = [];
            this.appPermission.selectedPermissions.forEach(data => {
              chileds.push({
                'clientRole': true,
                'composite': false,
                'containerId': API_URL.CONTAINER,
                'description': data.description,
                'id': data.id,
                'name': data.name,
                'scopeParamRequired': false,
              });
            });
            this.departmentService
              .CreateUserRole({
                postrequest: {
                  name: this.userRoleDetailForm.controls.roleName.value,
                  description: this.userRoleDetailForm.controls.roleName.value,
                  permission: chileds,
                  restrictionDtos: this.isLoginTimeRestriction
                    ? restrictionDtos
                    : []
                },
                department: this.userRoleDetailForm.controls.department.value
              })
              .subscribe(
                data => {
                  if (data.code === 0 || data.code == null) {
                    this.toastr.success('User Role Created Successfully');
                  } else {
                    this.toastr.error(data.errorMsg);
                  }
                },
                er => {
                  if (er.error) {
                    if (er.error === '409 Conflict') {
                      this.toastr.error('Sorry! Role name already exists.');
                    }
                  } else {
                    this.toastr.error(er);
                  }
                }
              );
          } else {
            if (this.modify.reason) {
              if (this.isManage && this.isupdateButtonClicked) {
                const chileds: Permission[] = [];
                this.appPermission.selectedPermissions.forEach(data => {
                  chileds.push({
                    'clientRole': true,
                    'composite': false,
                    'containerId': API_URL.CONTAINER,
                    'description': data.description,
                    'id': data.id,
                    'name': data.name,
                    'scopeParamRequired': false,
                  });
                });
                this.departmentService
                  .UpdateUserRole({
                    postrequest: {
                      name: this.incomingData.userRole,
                      description: this.incomingData.userRole.replace('ROLE_', '').replace('_', ' '),
                      modifiedReason: this.modify.reason,
                      permission: chileds,
                      restrictionDtos: this.isLoginTimeRestriction
                        ? restrictionDtos
                        : []
                    },
                    department: this.userRoleDetailForm.controls.department.value
                  })
                  .subscribe(
                    data => {
                      if (data.errorCode === 0 || data.errorCode == null) {
                        this.userRoleDetailForm.disable();
                        this.isupdateButtonClicked = false;
                        this.appPermission.isUpdateClicked = false;
                        this.toastr.success('Role updated successfully.');
                      } else {
                        this.toastr.error(data.errorMsg);
                      }
                    },
                    er => {
                      if (er.error) {
                        if (er.error === '409 Conflict') {
                          this.toastr.error('Sorry! Role name already exists.');
                        } else {
                          this.toastr.error(er.error);
                        }
                      } else {
                        this.toastr.error(er);
                      }
                    }
                  );
              }
            } else {
              this.modify.fireSubmit();
              // this.toastr.error('Modify Reason Required');
            }
          }
        } else {
          this.toastr.error('Please add the related permissions for the user role');
        }
      }
    }
  }

  cancel() {
    if (this.isManage) {
      this.loadPermissionData();
      this.userRoleDetailForm.disable();
      this.isupdateButtonClicked = false;
      this.appPermission.isUpdateClicked = false;
    } else {
      this.dataList = [];
      this.userRoleDetailForm.reset();
    }
    this.isLoginTimeRestriction = false;
  }

  private loadPermissionData() {
    const removeList = [];
    this.dataList = [];
    this.selectedList = [];
    let department;
    let roleName;
    if (this.isCreate) {
      department = this.userRoleDetailForm.controls.department.value;
    } else {
      department = this.incomingData.department;
      roleName = this.incomingData.userRole;
    }
    this.departmentService.GetRolesPermission().subscribe(
      data1 => {
        this.dataList = data1;
        this.departmentService.GetPermissionListByDepartmentId(department).subscribe(
          data2 => {
            this.selectedList = data2;
            for (const pCat of this.dataList) {
              for (const PGroup of pCat.chileds) {
                let i = 0;
                difference(this.selectedList, PGroup.chileds, name);

                for (const permission of PGroup.chileds) {
                  i++;
                  // //PGroup.chileds = PGroup.chileds.filter(permission => !this.selectedList.includes(permission));
                  let isExist = false;
                  for (const entry3 of this.selectedList) {
                    if (permission.name == entry3.name) {
                      isExist = true;
                    }
                  }
                  if (!isExist) {
                    removeList.push(permission);
                  }

                  if (PGroup.chileds.length == i) {
                    for (const rm of removeList) {
                      const index: number = PGroup.chileds.indexOf(rm, 0);
                      if (index !== -1) {
                        PGroup.chileds.splice(index, 1);
                      }
                    }
                  }
                }
              }
            }

            // Remove Empty groups and Empty Categories
            for (const entry of this.dataList) {
              for (const entry1 of entry.chileds) {
                if (entry1.chileds.length < 1) {
                  const index: number = entry.chileds.indexOf(entry1, 0);
                  if (index !== -1) {
                    entry.chileds.splice(index, 1);
                  }
                }
              }
              if (entry.chileds.length < 1) {
                const index: number = this.dataList.indexOf(entry, 0);
                if (index !== -1) {
                  this.dataList.splice(index, 1);
                }
              }
            }
            if (this.isManage) {
              this.departmentService.GetUserRolePermission(roleName).subscribe(
                data3 => {
                  this.selectedList = data3;
                  this.appPermission.loadPermissionTree(this.dataList, this.selectedList);
                });
            } else {
              this.selectedList = [];
              this.appPermission.loadPermissionTree(this.dataList, this.selectedList);
            }
          });
      });
  }
}


