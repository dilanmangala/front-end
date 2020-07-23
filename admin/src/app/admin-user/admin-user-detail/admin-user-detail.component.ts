import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl, NgForm
} from '@angular/forms';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {BasicList, DualListComponent} from 'angular-dual-listbox';
import {DepartmentService} from '../../shared/services/department.service';
import {PubSubService} from '../../shared/services/pub-sub/pub-sub.service';
import {CreateUserRequest, Department} from '../../shared';
import {ToastsManager} from 'ng2-toastr';
import {AppComponent} from '../../app.component';
import {CommonService} from '../../shared/services/common.service';
import {AddModifiedReasonComponent} from '../../shared/components/common/add-modified-reason/add-modified-reason.component';
import {queryRefresh} from '@angular/core/src/render3/query';
import {AdminUser} from '../../shared/models/create-user/admin-user';


@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css']
})
export class AdminUserDetailComponent implements OnInit {
  @ViewChild('recordForm') rform: NgForm;
  @Input() stepId = 2;
  @Input() incomingData;
  queryString = '';
  items: any[] = [];
  addButtonClicked = 0;
  editedIndex: any;
  selectedRole: any;
  format: any;
  dataForDropdown: any[] = [];
  source: any[] = [];
  confirmed: any[] = [];
  userRoleForDropdown: any[] = [];
  adminUserDetailForm: FormGroup;
  initialLoadingData: any[] = [];
  tabList: any[] = [];
  isManage: boolean;
  isCreate: boolean;
  modificationTypeId: number;
  isupdateButtonClicked = false;
  dataToSelect: any;
  existingUser: any;
  updateLoadingData: any;
  selectedList: Department[] = [];
  dataList: Department[] = [];
  @ViewChild(AddModifiedReasonComponent) modify: AddModifiedReasonComponent;
  allUserList: AdminUser[];
  userListToSave: AdminUser[];


  keepSorted = true;
  key: string;
  display: any;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private toastr: ToastsManager,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {

    this.adminUserDetailForm = this.fb.group({
      department: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      mobileNo: new FormControl(''),
      username: new FormControl(''),
      query: new FormControl('', null),
      email: new FormControl(''),
      displayName: new FormControl(''),
      password: new FormControl(''),
      contactNumber: new FormControl(''),
      status: new FormControl(''),
      branchUser: new FormControl(''),
      processApproval: new FormControl(''),
      modifyReason: this.fb.group({reasonSelect: ''})
    });
    this.commonService.GetJSON().subscribe(data => {
      this.dataToSelect = data;
    });
    this.modificationTypeId = AppComponent.modificationType.find(
      x => x.code == 'user_update'
    ).id;
    this.isManage = location.hash === '#/admin-users/manage-admin-users';
    this.isCreate = location.hash === '#/admin-users/add-admin-users';


    // if (this.isCreate) {
    //   this.loadLdapUserList();
    // }

    // this.source.push('test1');
    // this.source.push('test9');
    // this.source.push('test8');
    // this.source.push('test4');
    // this.source.push('test5');
    // this.source.push('test6');

    this.format = {
      add: 'Add',
      remove: 'Remove',
      all: 'All',
      none: 'None',
      direction: DualListComponent.LTR,
      draggable: true,
      locale: 'da'
    };

    // if (this.isCreate || (this.isManage && this.isupdateButtonClicked)) {
    this.adminUserDetailForm.controls.role.disable();
     this.departmentService.GetDepartment().subscribe(data => {
      this.dataForDropdown = data;
      if (this.isManage) {
        this.loadUserDetails();
      }
    });
    this.adminUserDetailForm.controls.department.valueChanges.subscribe(
      data => {
        if (data) {
          this.departmentService.GetUserRole(data).subscribe(data1 => {
            this.userRoleForDropdown = [];
            this.userRoleForDropdown = data1;
            if ((this.isManage && !this.isupdateButtonClicked)) {
              if (this.adminUserDetailForm.controls.role) {
                this.adminUserDetailForm.controls.role.reset();
              }
              this.adminUserDetailForm.controls.role.enable();
              this.adminUserDetailForm.controls.role.setValue(this.selectedRole);
              this.adminUserDetailForm.controls.role.disable();
            } else if (this.isCreate) {
              this.adminUserDetailForm.controls.role.enable();
            }
          });
        } else {
          this.adminUserDetailForm.controls.role.reset();
          this.adminUserDetailForm.controls.role.disable();
        }
      }
    );
    // } else {
    // this.pubsub.$sub(PubSubEvent.ADMIN_USER_SEARCH, data => {
    //   this.updateLoadingData = data;
    //   if (data.departmentDto) {
    //     this.departmentService.GetDepartment().subscribe(data1 => {
    //       this.dataForDropdown = data1;
    //       this.adminUserDetailForm.controls.department.setValue(
    //         data.departmentDto.name
    //       );
    //     });
    //   }
    //   if (data.roleDto) {
    //     this.departmentService
    //       .GetUserRole(data.departmentDto.name)
    //       .subscribe(data2 => {
    //         this.userRoleForDropdown = [];
    //         this.userRoleForDropdown = data2;
    //         this.adminUserDetailForm.controls.role.setValue(
    //           data.roleDto.name
    //         );
    //         this.departmentService
    //           .GetUserRolePermission(data.roleDto.name)
    //           .subscribe(data3 => {
    //
    //             this.pubsub.$pub(
    //               PubSubEvent.ROLES_DEPARTMENT_SEARCH_PERMISSION,
    //               data3
    //             );
    //             this.initialLoadingData = data3;
    //           });
    //       });
    //   }
    //   if (data.username) {
    //     this.adminUserDetailForm.controls.displayName.setValue(data.username);
    //   }
    //   if (data.email) {
    //     this.adminUserDetailForm.controls.email.setValue(data.email);
    //   }
    //   this.adminUserDetailForm.controls.branchUser.setValue(
    //     data.branchUser ? "yes" : "no"
    //   );
    //   this.adminUserDetailForm.controls.processApproval.setValue(
    //     data.branchUser ? "yes" : "no"
    //   );
    //   this.adminUserDetailForm.controls.status.setValue(
    //     data.status ? "ENABLE" : "DISABLE"
    //   );
    //   this.adminUserDetailForm.controls.walletAliasCode.setValue(
    //     data.walletAlisCode
    //   );
    //   this.adminUserDetailForm.controls.contactNumber.setValue(data.contact);
    //   Object.keys(this.adminUserDetailForm.controls).forEach(data1 => {
    //     this.adminUserDetailForm.get(data1).disable();
    //   });
    // });
    // }

    // this.adminUserDetailForm.controls.role.valueChanges.subscribe(data1 => {
    //   this.departmentService
    //     .GetUserRolePermission(this.adminUserDetailForm.controls.role.value)
    //     .subscribe(data => {
    //
    //       // this.pubsub.$pub(
    //       //   PubSubEvent.ROLES_DEPARTMENT_SEARCH_PERMISSION,
    //       //   data
    //       // );
    //       this.initialLoadingData = data;
    //     });
    // });
  }

  private displayValue(item: any) {
    return item.username;
  }

  loadUsers() {
    this.allUserList = [];
    this.source = [];
    if (this.queryString.length >= 3) {
      this.departmentService
        .getLdapUserByUserName(this.queryString)
        .subscribe(data => {
          this.allUserList = data;
          // for (const user  of this.allUserList) {
          //   this.source1.push(user.username);
          // }
          this.display = this.displayValue;
          this.source = JSON.parse(JSON.stringify(this.allUserList));
          this.key = 'username';
        });
    }
  }

  loadUserDetails() {
    this.departmentService
      .GetUserByUserName(this.incomingData)
      .subscribe(data => {
          this.existingUser = data;
          this.adminUserDetailForm.controls.department.setValue(data.departmentDto.name);
          const displayName = data.firstName && data.lastName ? data.firstName + ' ' + data.lastName
            : data.firstName && !data.lastName ? data.firstName
              : !data.firstName && data.lastName ? data.lastName : '';
          this.selectedRole = data.roleDto.name;
          this.adminUserDetailForm.controls.displayName.setValue(displayName);
          this.adminUserDetailForm.controls.role.setValue(data.roleDto);
          this.adminUserDetailForm.controls.username.setValue(data.username);
          this.adminUserDetailForm.controls.email.setValue(data.email);
          this.adminUserDetailForm.controls.status.setValue(data.enabled ? 'ENABLE' : 'DISABLE');
          this.adminUserDetailForm.disable();
        },
        err => {
          this.toastr.error(err);
        });
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
    if (this.isManage && !this.isupdateButtonClicked) {
      this.isupdateButtonClicked = true;
      this.adminUserDetailForm.controls.status.enable();

    } else {
      this.validateAllFormFields(this.adminUserDetailForm);
      if (this.adminUserDetailForm.valid) {
        if (this.isCreate) {
          if (this.confirmed.length > 0) {
            this.userListToSave = [];
            this.saveUsers(this.confirmed);
          } else {
            this.toastr.error('Please add the related users for the role');
          }
        } else if (this.isManage && this.isupdateButtonClicked) {
          if (this.modify.reason) {
            const req = {
              adminUserDtos: [{
                branchUser: false,
                contact: '',
                email: this.existingUser.email,
                emailVerified: false,
                firstName: this.existingUser.firstName,
                id: this.existingUser.id,
                isLdapUser: this.existingUser.isLdapUser,
                lastName: this.existingUser.lastName,
                password: this.existingUser.password,
                processApproval: false,
                username: this.existingUser.username,
                walletAlisCode: '',
                enabled: this.adminUserDetailForm.controls.status.value == 'ENABLE'
              }],
              userRoleDto: this.existingUser.roleDto,
              departmentDto: this.existingUser.departmentDto,
              modifiedReason: this.modify.reason,
            };
            this.departmentService
              .UpdateAdminUser(req)
              .subscribe(
                data => {
                  this.toastr.success('User updated successfully.');
                  this.isupdateButtonClicked = false;
                  this.adminUserDetailForm.disable();
                },
                err => {
                  this.toastr.error(err.message);
                }
              );
          } else {
            this.modify.fireSubmit();
            // this.toastr.error('Modify Reason Required');
          }
          // const adminUser: any[] = [];
          // adminUser.push({
          //   branchUser:
          //   this.adminUserDetailForm.controls.branchUser.value === 'Yes',
          //   contact: this.adminUserDetailForm.controls.contactNumber.value,
          //   email: this.adminUserDetailForm.controls.email.value,
          //   emailVerified: !this.updateLoadingData.isLdapUser,
          //   firstName: this.updateLoadingData.firstName,
          //   id: this.updateLoadingData.id,
          //   isLdapUser: this.updateLoadingData.isLdapUser,
          //   lastName: this.updateLoadingData.lastName,
          //   password: this.updateLoadingData.password,
          //   processApproval:
          //   this.adminUserDetailForm.controls.processApproval.value === 'Yes',
          //   username: this.updateLoadingData.username,
          //   walletAlisCode: this.updateLoadingData.walletAlisCode
          // });
          // this.departmentService
          //   .UpdateAdminUser({
          //     adminUserDtos: adminUser,
          //     departmentDto: this.dataForDropdown.filter(
          //       data =>
          //         data.name === this.adminUserDetailForm.controls.department.value
          //     )[0],
          //     userRoleDto: this.userRoleForDropdown.filter(
          //       data => data.name === this.adminUserDetailForm.controls.role.value
          //     )[0]
          //   })
          //   .subscribe(
          //     data => {
          //       this.toastr.success('Admin User Added SuccessFully');
          //       this.isupdateButtonClicked = false;
          //     },
          //     err => {
          //       this.toastr.error(err.message);
          //     }
          //   );
        }
      }
    }
  }

  cancel() {
    if (this.isManage) {
      this.loadUserDetails();
      this.isupdateButtonClicked = false;
    } else {
      this.source = [];
      this.confirmed = [];
      this.items = [];
      this.adminUserDetailForm.reset();
    }


  }

  private saveUsers(users: AdminUser[]) {

    this.departmentService
      .CreateAdminUser({
        adminUserDtos: users,
        departmentDto: this.dataForDropdown.filter(
          data =>
            data.name === this.adminUserDetailForm.controls.department.value
        )[0],
        userRoleDto: this.userRoleForDropdown.filter(
          data => data.name === this.adminUserDetailForm.controls.role.value
        )[0]
      })
      .subscribe(
        data => {
          this.toastr.success('User Created SuccessFully');
          this.adminUserDetailForm.reset();
          this.confirmed = [];
          this.source = [];

          return data;
        },
        err => {
          this.toastr.error(err.message);
          return err;
        }
      );
  }

}
