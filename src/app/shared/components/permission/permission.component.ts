import {Department} from './../../models/department/department';
import {Component, OnInit, Input, ViewContainerRef, Injectable, ViewChild, SimpleChanges} from '@angular/core';
import {PubSubEvent} from '../../../../environments/pub-sub-event';
import {PubSubService} from '../../services/pub-sub/pub-sub.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DepartmentService} from '../../services/department.service';
import {
  DownlineTreeviewItem,
  OrderDownlineTreeviewEventParser,
  TreeviewComponent,
  TreeviewConfig,
  TreeviewEventParser, TreeviewHelper,
  TreeviewItem
} from 'ngx-treeview';
import {forEach} from '@angular/router/src/utils/collection';
import {TvItem} from './TvItem';
import {DepartmentResponse} from '../../models/department';
import {isNil, remove, reverse} from 'lodash';

@Injectable()
export class PermissionTreeviewConfig extends TreeviewConfig {
  hasAllCheckBox = false;
  hasFilter = false;
  hasCollapseExpand = false;
  maxHeight = 500;
}

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
  providers: [
    {provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser},
    {provide: TreeviewConfig, useClass: PermissionTreeviewConfig}
  ]
})

export class PermissionComponent implements OnInit {
  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;
  tabList: {}[];
  @Input() dataList;
  @Input() selectedList;
  items: TreeviewItem[] = [];
  data: Department[] = [];
  item: any;
  initialLoadData: Department[] = [];
  isModified = false;
  isSearchButtonClicked: boolean;
  permissionData: any;
  searchButtonClicked: any;
  rolesDepartmentInitialLoad: any;
  permition: TreeviewItem;
  selectedPermissions: any;
  config = {};

  constructor(
    private fb: FormBuilder,
    private toastr: ToastsManager,
    private departmentService: DepartmentService,
    private pubsub: PubSubService,
    private vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  checkBoxTableForm: FormGroup;
  isCreate: boolean;
  isManage: boolean;
  isUpdateClicked: boolean;
  isAdminUser: boolean;

  ngOnInit() {
    this.config = {
      hasAllCheckBox: false,
      hasFilter: false,
      hasCollapseExpand: false,
      decoupleChildFromParent: false,
      maxHeight: 800
    };
    this.isUpdateClicked = false;
    //#region form group Generation

    this.checkBoxTableForm = this.fb.group({});
    //#endregion
    this.isCreate = location.hash === '#/department/add-department';
    this.isManage =
      location.hash === '#/department/manage-department' ||
      location.hash === '#/user-role/manage-user-role';
    this.isAdminUser =
      location.hash === '#/admin-users/add-admin-users' ||
      location.hash === '#/admin-users/manage-admin-users';
    if (this.isCreate) {
      // this.formGroupInitialization();
    }

    this.loadPermissionTree(this.dataList, this.selectedList);

    // this.pubsub.$sub(PubSubEvent.DEPARTMENT_SEARCH_PERMISSION, data => {
    //   this.searchButtonClicked = data;
    //   this.formGroupInitialization();
    // });
    // this.departmentService.GetRolesPermission().subscribe(
    //   data1 => {
    //     console.log('-----------------------------------------------------');
    //     this.loadPermissionTree(data1, []);
    //
    //     console.log('-----------------------------------------------------');
    //     //this.loadPermissionTree(data1);
    //   });

    // let checkBoxDataChanges: any = this.checkBoxTableForm.value;
    // this.checkBoxTableForm.valueChanges.subscribe(data => {
    //   if (checkBoxDataChanges !== data && Object.keys(data).some(k => data[k])) {
    //     Object.keys(data).forEach(item => {
    //       if (checkBoxDataChanges[item] !== data[item]) {
    //         this.initialLoadData.forEach(element => {
    //           element.chileds.forEach(element1 => {
    //             const index = element1.chileds.find(
    //               data11 => data11.name === item
    //             );
    //             if (index) {
    //               let count = 0;
    //               element1.chileds.forEach(element2 => {
    //                 if (this.checkBoxTableForm.get(element2.name).value) {
    //                   count++;
    //                 } else if (
    //                   !this.checkBoxTableForm.get(element2.name).value
    //                 ) {
    //                   count--;
    //                 }
    //               });
    //               if (
    //                 !this.checkBoxTableForm.get(element1.name).value &&
    //                 element1.chileds.length === count
    //               ) {
    //                 this.checkBoxTableForm.get(element1.name).setValue(true);
    //               } else if (
    //                 this.checkBoxTableForm.get(element1.name).value &&
    //                 element1.chileds.length !== count
    //               ) {
    //                 console.log('I am firing');
    //                 this.checkBoxTableForm.get(element1.name).setValue(false);
    //               }
    //             }
    //             // }
    //           });
    //         });
    //       }
    //     });
    //     checkBoxDataChanges = data;
    //     this.pubsub.$pub('CheckboxTableForm_Modified', data);
    //   }
    // });
    // this.pubsub.$sub(PubSubEvent.Clear_Checkbox_Table_Form, data => {
    //   if (data) {
    //     this.checkBoxTableForm.reset();
    //   }
    // });
    // this.pubsub.$sub('updateButtonClicked', data => {
    //   if (data) {
    //     this.checkBoxTableForm.enable();
    //     this.isUpdateClicked = true;
    //   } else if (!data) {
    //     this.checkBoxTableForm.disable();
    //     this.isUpdateClicked = false;
    //   }
    // });
    // this.pubsub.$sub(PubSubEvent.DATA_TO_STEPPER_CLICK, data => {
    //   if (data) {
    //     this.searchButtonClicked = data.dataToCheck;
    //   }
    // });
    // this.pubsub.$sub(PubSubEvent.ROLES_DEPARTMENT_SEARCH_PERMISSION, data => {
    //   this.rolesDepartmentInitialLoad = data;
    //   this.formGroupInitialization();
    // });
  }

  // formGroupInitialization() {
  //   const dataToPass: Department[] = [];
  //   this.departmentService.GetRolesPermission().subscribe(
  //     data1 => {
  //       if (this.rolesDepartmentInitialLoad) {
  //         data1.forEach(item => {
  //           if (item.chileds) {
  //             item.chileds.forEach(item1 => {
  //               if (item1.chileds) {
  //                 item1.chileds.forEach(item2 => {
  //                   const temp = this.rolesDepartmentInitialLoad.find(
  //                     x => x.name === item2.name
  //                   );
  //                   if (temp) {
  //                     if (dataToPass.indexOf(item) < 0) {
  //                       dataToPass.push(item);
  //                     }
  //                     if (
  //                       dataToPass
  //                         .find(x => x.name === item.name)
  //                         .chileds.indexOf(item1) < 0
  //                     ) {
  //                       dataToPass
  //                         .find(x => x.name === item.name)
  //                         .chileds.push(item1);
  //                     }
  //                   }
  //                 });
  //               }
  //             });
  //           }
  //         });
  //         this.loadData(dataToPass);
  //         this.initialLoadData = dataToPass;
  //       } else {
  //         this.loadData(data1);
  //         this.initialLoadData = data1;
  //       }
  //     },
  //     err => {}
  //   );
  // }
  // loadData(data1) {
  //   if (data1) {
  //     data1.forEach(element2 => {
  //       if (element2.chileds) {
  //         element2.chileds.forEach(element => {
  //           if (element2.chileds) {
  //             this.checkBoxTableForm.addControl(
  //               element.name,
  //               new FormControl(false)
  //             );
  //             if (element.chileds) {
  //               element.chileds.forEach(element1 => {
  //                 this.checkBoxTableForm.addControl(
  //                   element1.name,
  //                   new FormControl(false)
  //                 );
  //               });
  //             }
  //           }
  //         });
  //       }
  //     });
  //     this.pubsub.$pub("InitialLoadingData", data1);
  //     if (this.tabList) {
  //       this.data = [];
  //       this.tabList.forEach(element4 => {
  //         const department = data1.find(
  //           element1 => element1.name === element4.index
  //         );
  //         if (department) {
  //           if (department.chileds.length > 0) {
  //             department.description = element4.name;
  //             this.data.push(department);
  //           }
  //         }
  //       });
  //     }
  //     if (this.searchButtonClicked && this.isManage) {
  //       this.searchButtonClicked.forEach(element1 => {
  //         console.log(this.searchButtonClicked);
  //         if (this.checkBoxTableForm.get(element1.name)) {
  //           this.checkBoxTableForm.get(element1.name).setValue(true);
  //           if (
  //             this.searchButtonClicked.indexOf(element1) ===
  //             this.searchButtonClicked.length - 1
  //           ) {
  //             if (this.checkBoxTableForm.get(element1.name).value) {
  //               if (!this.isUpdateClicked) {
  //                 Object.keys(this.checkBoxTableForm.controls).forEach(item => {
  //                   this.checkBoxTableForm.get(item).disable();
  //                 });
  //               }
  //             }
  //           }
  //         }
  //       });
  //     }
  //   }
  // }


  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
    this.selectedPermissions = [];
    this.isModified = true;
    downlineItems.forEach(downlineItem => {
      const item = downlineItem.item;
      const value = item.value;
      const texts = [item.text];
      let parent = downlineItem.parent;
      while (!isNil(parent)) {
        texts.push(parent.item.text);
        parent = parent.parent;
      }
      // const reverseTexts = reverse(texts);
      // const row = `${reverseTexts.join(' -> ')} : ${value}`;
      this.selectedPermissions.push(value);
    });
  }

  public loadPermissionTree(data: Department[], selectedList: Department[]) {
    this.items = [];
    this.selectedPermissions = [];
    const pcat: TreeviewItem[] = [];
    for (const entry of data) {
      const pgrp: TreeviewItem[] = [];
      for (const entry1 of entry.chileds) {
        const pems: TreeviewItem[] = [];
        for (const entry2 of entry1.chileds) {
          let selected = false;
          if (this.isManage) {
            for (const sperm of selectedList) {
              if (entry2.name === sperm.name) {
                selected = true;
                this.selectedPermissions.push(entry2);
              }
            }
          }
          const item1 = {
            text: entry2.description,
            value: entry2,
            checked: selected
          };
          this.permition = new TreeviewItem(item1);
          this.permition.correctChecked();
          pems.push(this.permition);
        }
        const item = {
          text: entry1.description,
          value: entry1,
          children: pems
        };
        pgrp.push(new TreeviewItem(item));
      }
      const pgrpItem = {
        text: entry.description,
        value: entry,
        children: pgrp
      };
      // pcat.push(new TreeviewItem(pgrpItem));
      this.items.push(new TreeviewItem(pgrpItem));
    }
  }

  public getSelectedPermissionList() {
    return this.selectedPermissions;
  }
}
