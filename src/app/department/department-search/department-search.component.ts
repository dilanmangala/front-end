import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DepartmentService} from './../../shared/services/department.service';
import {ToastsManager} from 'ng2-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-department-search',
  templateUrl: './department-search.component.html',
  styleUrls: ['./department-search.component.scss']
})
export class DepartmentSearchComponent implements OnInit {
  @Output() nextClick = new EventEmitter();
  @Output() resetClick = new EventEmitter();
  @Output() depName = new EventEmitter();
  @Input() stepId: number;
  isManageDepartment: boolean;
  iscreateDepartment: boolean;
  submitError = false;
  isButtonEnabled = true;
  departmentNameForm: FormGroup;
  dataForDropdown: any[] = [];

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private toastr: ToastsManager
  ) {
  }

  ngOnInit() {
    this.isButtonEnabled = true;
    this.isManageDepartment =
      location.hash === '#/department/manage-department';
    this.iscreateDepartment = location.hash === '#/department/add-department';
    if (this.isManageDepartment) {
      this.departmentService.GetDepartment().subscribe(data => {
        this.dataForDropdown = data;
      });
    }
    this.departmentNameForm = this.fb.group({
      departmentName: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  resetButtonClick() {
    this.isButtonEnabled = true;
    this.departmentNameForm.reset();
    this.resetClick.emit();

  }

  searchButtonClick() {
    this.validateAllFormFields(this.departmentNameForm);
    if (this.departmentNameForm.controls.departmentName.valid) {
      this.departmentService
        .GetPermissionListByDepartmentId(
          this.departmentNameForm.controls.departmentName.value
        )
        .subscribe(
          data => {
            this.isButtonEnabled = false;
            this.nextClick.emit({'stepId': this.stepId, 'department': this.departmentNameForm.controls.departmentName.value});
          },
          err => {
            this.toastr.error(err.error.message);
          }
        );
      this.submitError = false;
    } else {
      this.submitError = true;
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

  setDepName() {
    this.depName.emit({'department': this.departmentNameForm.controls.departmentName.value});
  }
}
