import {DepartmentService} from './../../shared/services/department.service';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DepartmentResponse, PubSubService} from '../../shared';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-user-role-search',
  templateUrl: './user-role-search.component.html',
  styleUrls: ['./user-role-search.component.css']
})
export class UserRoleSearchComponent implements OnInit {
  userRoleSearchForm: FormGroup;
  dataForDropdown: DepartmentResponse[] = [];
  userRoleForDropdown: any[] = [];
  setRole = '';
  isButtonEnabled = true;

  @Output() nextClick = new EventEmitter();
  @Output() resetClick = new EventEmitter();
  @Output() depName = new EventEmitter();
  @Input() stepId: number;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private toastr: ToastsManager
    // private pubsub: PubSubService
  ) {
  }

  ngOnInit() {
    this.isButtonEnabled = true;
    this.userRoleSearchForm = this.fb.group({
      role: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required])
    });
    this.userRoleSearchForm.controls.role.disable();
    this.departmentService.GetDepartment().subscribe(data => {
      this.dataForDropdown = data;
    });
    let departmentChangedName = '';
    this.userRoleSearchForm.controls.department.valueChanges.subscribe(data => {
      if (data && departmentChangedName !== data) {
        departmentChangedName = data;
        this.departmentService.GetUserRole(data).subscribe(data1 => {
          this.userRoleForDropdown = [];
          this.userRoleForDropdown = data1;
          if (this.userRoleSearchForm.controls.role) {
            this.userRoleSearchForm.controls.role.reset();
          }
          this.userRoleSearchForm.controls.role.enable();
          if (this.setRole !== '') {
            this.userRoleSearchForm.controls.role.setValue(this.setRole);
          }
        });
      } else {
        this.userRoleSearchForm.controls.role.reset();
        this.userRoleSearchForm.controls.role.disable();
      }
    });
    // this.pubsub.$sub(PubSubEvent.DATA_TO_STEPPER_CLICK, data => {
    //   this.userRoleSearchForm.controls.department.setValue(data.department);
    //   this.setRole = data.role;
    // });
    // this.pubsub.$sub("StepperClick", data => {
    //   if (data === "2") {
    //     this.userRoleSearchButtonClick();
    //   }
    // });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl && null != control.errors) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  userRoleSearchButtonClick() {
    this.validateAllFormFields(this.userRoleSearchForm);
    if (this.userRoleSearchForm.valid) {
      this.departmentService
        .GetUserRolePermission(this.userRoleSearchForm.controls.role.value)
        .subscribe(data => {
          if (data.length > 0) {
            this.isButtonEnabled = false;
            this.nextClick.emit({
              'stepId': this.stepId,
              'userRole': this.userRoleSearchForm.controls.role.value,
              'department': this.userRoleSearchForm.controls.department.value
            });
          }
        });
    }
  }

  resetButtonClick() {
    this.isButtonEnabled = true;
    this.userRoleSearchForm.reset();
    this.resetClick.emit();
  }


}
