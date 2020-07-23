import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DepartmentService} from '../../shared/services/department.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-admin-user-search',
  templateUrl: './admin-user-search.component.html',
  styleUrls: ['./admin-user-search.component.css']
})
export class AdminUserSearchComponent implements OnInit {
  @Output() nextClick = new EventEmitter();
  @Output() resetClick = new EventEmitter();
  @Output() depName = new EventEmitter();
  @Input() stepId: number;
  isButtonEnabled = true;
  adminUserSearchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private toastr: ToastsManager
  ) {
  }

  dataForDropdown: any[] = [];
  userRoleForDropdown: any[] = [];

  ngOnInit() {
    this.adminUserSearchForm = this.fb.group({
      userName: new FormControl('', [Validators.required])
    });

  }

  adminUserSearchButtonClick() {
    this.validateAllFormFields(this.adminUserSearchForm);
    if (this.adminUserSearchForm.valid) {
      this.departmentService
        .GetUserByUserName(this.adminUserSearchForm.controls.userName.value)
        .subscribe(data => {
            if (data.username) {
              this.isButtonEnabled = false;
              this.nextClick.emit({'stepId': this.stepId, 'userId': data.username});
            }
          },
          err => {
            if (err.error) {
              this.toastr.error(err.error.message);
            } else {
              this.toastr.error(err);
            }
          });
    }
  }

  resetButtonClick() {
    this.isButtonEnabled = true;
    this.adminUserSearchForm.reset();
    this.resetClick.emit();
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
}
