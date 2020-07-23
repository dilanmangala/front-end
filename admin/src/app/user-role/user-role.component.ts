import { PubSubService } from './../shared/services/pub-sub/pub-sub.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { Steps } from '../shared/models/common/steps';
import { PubSubEvent } from '../../environments/pub-sub-event';
import {StepperComponent} from '../shared/components/common/stepper/stepper.component';
@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {
  // Stepper vars
  steps: Steps[] = [];
  activeStep = 1;
  data: any;
  @ViewChild(StepperComponent) stepper: StepperComponent;

  isManageUserRole: boolean;
  isCreateUserRole: boolean;
  isUpdateButtonClicked: boolean;
  isSearchButtonClicked: boolean;

  constructor(private pubsub: PubSubService) { }

  ngOnInit() {
    //    this.pubsub.$sub(
    //   PubSubEvent.USERROLE_SEARCH_DEPARTMENT_NAME, data => {
    //     console.log(data);

    //  console.log(data);
    //     }  );
   this. isManageUserRole = location.hash === '#/user-role/manage-user-role';
   this.isCreateUserRole = location.hash === '#/user-role/add-user-role';
  // this.isSearchButtonClicked=false;
    this.steps = [
      { id: 1, name: 'Search User Role', isActive: true, isEnabled: true  },
      { id: 0, name: '', isActive: true, isEnabled: true  },
      { id: 2, name: 'Manage User Role', isActive: false, isEnabled: false  }
    ];
    this.pubsub.$sub(PubSubEvent.DEPARTMENT_SEARCH_PERMISSION, data => {
      this.isSearchButtonClicked = true;
    });
    this.pubsub.$sub(
      PubSubEvent.USERROLE_RESET_CLICKED, data => {
        this.isSearchButtonClicked = false;
      });
        this.pubsub.$sub(PubSubEvent.USERROLE_UPDATE_BUTTON_CLICKED, data => {
          this.isUpdateButtonClicked = data;
        });
        this.pubsub.$sub('StepperClick', data => {
          if(data === '1'){
            this.isSearchButtonClicked = false;
          }
          if(data === '2'){
            this.pubsub.$pub(PubSubEvent.STEPS, 2);
            this.isSearchButtonClicked = true;
          }
        });
  }

//Stepper Emit
  getRoleName(data: any) {
    this.data = data.userRole;
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
      this.data = data;
    this.activeStep = (data.stepId) + 1;
  }
}
