import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Steps} from '../shared/models/common/steps';
import {ToastsManager} from 'ng2-toastr';
import {StepperComponent} from '../shared/components/common/stepper/stepper.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {
  // Stepper vars
  steps: Steps[] = [];
  activeStep = 1;
  data: any;
  @ViewChild(StepperComponent) stepper: StepperComponent;

  isCreateDepartment: boolean;
  isManageDepartment: boolean;
  isSearchVisible: boolean;
  isUpdateButtonClicked: boolean;
  constructor(
    // private pubsub: PubSubService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.steps = [
      {id: 1, name: 'Search Department', isActive: true, isEnabled: true},
      {id: 0, name: '', isActive: true, isEnabled: true},
      {id: 2, name: 'Manage Department', isActive: false, isEnabled: false}
    ];

    this.isSearchVisible = false;
    this.isManageDepartment =
      location.hash === '#/department/manage-department';
    this.isCreateDepartment = location.hash === '#/department/add-department';
    // this.pubsub.$sub(PubSubEvent.DEPARTMENT_SEARCH_PERMISSION, data => {
    //   if (data.length > 0) {
    //     this.isSearchVisible = true;
    //   }
    // });
    // this.pubsub.$sub(
    //   PubSubEvent.DEPARTMENT_SEARCH_RESET_BUTTON_CLICKED,
    //   data => {
    //     this.isSearchVisible = false;
    //   }
    // );
    // this.pubsub.$sub('updateButtonClicked', data => {
    //   if (data) {
    //     this.isUpdateButtonClicked = true;
    //   }
    // });
    //
    // this.pubsub.$sub('StepperClick', data => {
    //   if (data === '1') {
    //     this.isSearchVisible = false;
    //   } else if (data === '2') {
    //     this.isSearchVisible = true;
    //     this.pubsub.$pub(PubSubEvent.STEPS, 2);
    //   }
    // });
  }


//Stepper Emit
  getDepName(data: any) {
    this.data = data.department;
  }

//Stepper Emit
  onClickReset() {
    this.data = null;
    this.stepper.stepReset();
    this.activeStep = 1;
  }

//Stepper Emit
  onSelectStep(stepId: number) {
    this.activeStep = stepId;
  }

//Stepper Emit
  onClickNext(data: any) {
     this.data = data.department;
    this.activeStep = (data.stepId) + 1;
  }
}
