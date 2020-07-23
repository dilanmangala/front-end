// import { Steps } from './../../../models/common/steps';
import {SelectItem} from './../../../models/common/select-item';
import {Component, OnInit, Output, Input, ViewEncapsulation, EventEmitter, SimpleChange, OnChanges} from '@angular/core';
import {PubSubService} from '../../../services/pub-sub/pub-sub.service';
import {PubSubEvent} from '../../../../../environments/pub-sub-event';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html', encapsulation: ViewEncapsulation.None,
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnChanges {
  stepClicked: string;
  activeComponent = 1;
  @Output() stepperClick = new EventEmitter<number>();
  @Input() steps;
  @Input() activeStep;
  dataToStepperClick: any;
  temp = [{'name': 'one'}, {'name': 'two'}, {'name': 'three'}, {'name': 'four'}];
  closeResult: string;
  isAnythingUpdated: boolean;


  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    // if (this.activeStep != (changes['activeStep'].currentValue)) {
      if (changes['activeStep']) {
      this.activeStep = changes['activeStep'].currentValue;
      this.stepNext(this.activeStep);
    }
    // }
  }


  // ngOnInit() {
  //TODO Remove this after finish next Step
  // this.pubsub.$sub(PubSubEvent.STEPS,
  //   data => {
  //     console.log(data);
  //     this.steps.filter(item => item.id === data).map(item => item.isActive = true);
  //     this.steps.filter(item => item.id === data).map(item => item.isEnabled = true);
  //     this.steps.filter(item => item.id === data - 1).map(item => item.isActive = false);
  //   });
  //
  // //TODO Remove this after finish steper reset
  // this.pubsub.$sub(PubSubEvent.STEPS_RESET,
  //   data => {
  //     this.steps.filter(item => item.id === 1).map(item => item.isActive = true);
  //     this.steps.filter(item => item.id === data).map(item => item.isActive = false);
  //   });
  //
  // this.pubsub.$sub(PubSubEvent.DATA_PASS_TO_STEPPER_CLICK, data => {
  //   console.log(data);
  //   this.dataToStepperClick = data;
  // });

  //Chaeck modify
  // this.pubsub.$sub('Stepper_IsAnyThingModified', data => {
  //   this.isAnythingUpdated = data;
  // });
  // }

  public stepReset() {

    this.steps.forEach(step => {
      let activated = false;
      let enabled = false;
      if (step.id === 1) {
        activated = true;
        enabled = true;
      }
      this.steps.filter(item => item.id === step.id).map(item => item.isActive = activated);
      this.steps.filter(item => item.id === step.id).map(item => item.isEnabled = enabled);
      // this.steps.filter(item => item.id === stepIndex).map(item => item.isActive = false);
    });
    this.activeComponent = 1;
    //Reset isModified param
    this.isModified(false);
  }

  public stepNext(stepIndex: number) {
        this.steps.forEach(step => {
      let activated = false;
      let enabled = step.isEnabled;
      if (step.id == stepIndex) {
        activated = true;
        enabled = true;
      }
      this.steps.filter(item => item.id === step.id).map(item => item.isActive = activated);
      this.steps.filter(item => item.id === step.id).map(item => item.isEnabled = enabled);
      // this.steps.filter(item => item.id === stepIndex).map(item => item.isActive = false);
    });
    this.activeComponent = stepIndex;
  }

  public isModified(data: boolean) {
    this.isAnythingUpdated = data;
  }

  anchorClick(event, content) {
    if (event.target.id === '1' && this.isAnythingUpdated) {
      this.open2(content);
    } else {
       this.stepNext(event.target.id);
      this.stepperClick.emit(event.target.id);
    }
  }

  constructor(
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private pubsub: PubSubService
  ) {
  }

  open2(content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.modalService2.open(content, {windowClass: 'dark-modal'});
  }

//   stay(){
// console.log("stay clicked");
//   }
//   leave(){
//     this.pubsub.$pub('is_Control_Wallet_Updated', false);
// console.log("leave clicked");
// window.close();
//   }
  private getDismissReason(reason: any): string {
    // console.log(reason);
    if (reason === 'stay') {
    } else if (reason === 'leave' && this.stepClicked === '1') {
      this.steps.filter(item => item.id === 1).map(item => item.isActive = true);
      //todo: 2 should be
      this.steps.filter(item => item.id === 2).map(item => item.isActive = false);
      this.pubsub.$pub('StepperClick', this.stepClicked);
      this.pubsub.$pub(PubSubEvent.DATA_TO_STEPPER_CLICK, this.dataToStepperClick);
    }
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
