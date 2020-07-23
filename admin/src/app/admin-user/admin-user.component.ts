import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {PubSubEvent} from '../../environments/pub-sub-event';
import {PubSubService} from '../shared/services/pub-sub/pub-sub.service';
import {ToastsManager} from 'ng2-toastr';
import {Steps} from '../shared/models/common/steps';
import {StepperComponent} from '../shared/components/common/stepper/stepper.component';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  // Stepper vars
  steps: Steps[] = [];
  activeStep = 1;
  data: any;
  @ViewChild(StepperComponent) stepper: StepperComponent;
  isManage: boolean;
  isCreate: boolean;
  isUpdateButtonClicked: boolean;
  isSearchButtonClicked: boolean;
  // steps: { id: number; name: string; isActive: boolean; }[];

  constructor(
    // private pubsub: PubSubService,
              private toastr: ToastsManager,
              vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.isManage = location.hash === '#/admin-users/manage-admin-users';
    this.isCreate = location.hash === '#/admin-users/add-admin-users';

    this.steps = [
      {id: 1, name: 'Search Admin User', isActive: true, isEnabled: true},
      {id: 0, name: '', isActive: true, isEnabled: true},
      {id: 2, name: 'Manage Admin User', isActive: false, isEnabled: false}
    ];
    // this.pubsub.$sub(PubSubEvent.ADMIN_USER_SEARCH, data => {
    //   this.isSearchButtonClicked = true;
    // });
    // this.pubsub.$sub('StepperClick', data => {
    //   if (data === '1') {
    //     this.isSearchButtonClicked = false;
    //   }
    //   if (data === '2') {
    //     this.pubsub.$pub(PubSubEvent.STEPS, 2);
    //     this.isSearchButtonClicked = true;
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
       this.data = data.userId;
    this.activeStep = (data.stepId) + 1;
  }
}
