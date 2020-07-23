import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PubSubService } from '../../shared';
import { ToastsManager } from 'ng2-toastr';
import { PubSubEvent } from "../../../environments/pub-sub-event";
@Component({
  selector: 'app-user-role-login-time',
  templateUrl: './user-role-login-time.component.html',
  styleUrls: ['./user-role-login-time.component.css']
})
export class UserRoleLoginTimeComponent implements OnInit {
  someRange = [];
  timeToFill: any[] = [];
  loginTimeForm: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastsManager , private pubsub: PubSubService, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
// this.someValue= [ 0, 1440 ];
this.pubsub.$sub(PubSubEvent.Clear_Checkbox_Table_Form, data=>{
  this.loginTimeForm.reset();
});
     this.timeToFill = [
      {
      day:"Sunday",
      day1:"Sunday1",
      range: [ 0, 1440 ]
    }, {
      day:"Monday",
      day1:"Monday1",
      range: [ 0, 1440 ]
    }, {
      day:"Tuesday",
      day1:"Tuesday1",
      range: [ 0, 1440 ]
    }, {
      day:"Wednesday",
      day1:"Wednesday1",
      range: [ 0, 1440 ]
    }, {
      day:"Thursday",
      day1:"Thursday1",
      range: [ 0, 1440 ]
    }, {
      day:"Friday",
      day1:"Friday1",
      range: [ 0, 1440 ]
    }, {
      day1:"Saturday1",
      day:"Saturday",
      range: [ 0, 1440 ]
    }
  ];
 this.loginTimeForm = this.fb.group({});

  this.timeToFill.forEach(element => {
    this.loginTimeForm.addControl(
      element.day,
      new FormControl(false)
    );
    this.loginTimeForm.addControl(
      element.day1,
      new FormControl(false)
    );
  });
  this.loginTimeForm.valueChanges.subscribe(data => {
    this.pubsub.$pub("UserRoleLoginTimeDataChanges",this.loginTimeForm.value);

  });
 }
}
