import {ModificationType} from './../../../models/modification-type/modification-type';
import {CommonService} from './../../../services/common.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import {Component, OnInit, Input} from '@angular/core';
import {AppComponent} from '../../../../app.component';
// import { PubSubService } from "../../..";
import {ToastsManager} from 'ng2-toastr';
import {GetModificationTypeResponse} from '../../../models/get-modification-type/get-modification-type.response';

@Component({
  selector: 'app-add-modified-reason',
  templateUrl: './add-modified-reason.component.html',
  styleUrls: ['./add-modified-reason.component.css']
})
export class AddModifiedReasonComponent implements OnInit {
  @Input() modificationTypeId: number;
  @Input() showError: boolean;
  moficationType: number;
  @Input() public addModfiedReasonForm: FormGroup;
  disableAddReason = true;
  reason: string;
  modificationForSelect: GetModificationTypeResponse[];

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private toastr: ToastsManager
    // private pubsub: PubSubService
  ) {
  }

  ngOnInit() {
    this.commonService
      .GetModificationTypeForDropdown(this.modificationTypeId)
      .subscribe(data => {
        this.modificationForSelect = data;
      });
    this.addModfiedReasonForm = this.fb.group({
      reason: new FormControl('', [Validators.required]),
      reasonSelect: new FormControl('', [Validators.required])
    });

    this.addModfiedReasonForm.controls.reasonSelect.valueChanges.subscribe(data => {
      if (data && this.reason !== data) {
        this.reason = data;
      } else {
        this.reason = '';
      }
    });

    this.disableAddReason =
      this.addModfiedReasonForm.controls.reason.value ===
      this.addModfiedReasonForm.controls.reasonSelect.value;
    if (this.addModfiedReasonForm.controls.reasonSelect) {
      this.addModfiedReasonForm.controls.reasonSelect.valueChanges.subscribe(
        data => {
          this.addModfiedReasonForm.controls.reason.reset();
          if (this.addModfiedReasonForm.controls.reasonSelect) {
            if (
              this.modificationForSelect.find(
                data1 =>
                  data1.id === this.addModfiedReasonForm.controls.reasonSelect.value
              )
            ) {
              this.addModfiedReasonForm.controls.reason.setValue(
                this.modificationForSelect.find(
                  data1 =>
                    data1.id ===
                    this.addModfiedReasonForm.controls.reasonSelect.value
                ).reasonCode
              );
            }
          }
        }
      );
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

  fireSubmit() {
    this.validateAllFormFields(this.addModfiedReasonForm);
  }

  addReasonClick() {
    if (
      this.modificationForSelect.find(
        data =>
          data.reasonCode === this.addModfiedReasonForm.controls.reason.value
      )
    ) {
      this.toastr.error('Modified Reason Already Exist');
    } else {
      this.commonService
        .AddModifiedReason({
          createdBy: localStorage.getItem('userName'),
          modificationTypeId: this.modificationTypeId,
          reasonCode: this.addModfiedReasonForm.controls.reason.value
        })
        .subscribe(data => {
          if (data.id > 0) {
            this.commonService
              .GetModificationTypeForDropdown(this.modificationTypeId)
              .subscribe(data1 => {
                this.modificationForSelect = data1;
              });
            this.toastr.success('Modified reason added successfully.');
          }
        });
    }
  }
}
