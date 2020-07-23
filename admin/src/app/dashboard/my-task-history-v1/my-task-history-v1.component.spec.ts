/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyTaskHistoryV1Component } from './my-task-history-v1.component';

describe('MyTaskHistoryV1Component', () => {
  let component: MyTaskHistoryV1Component;
  let fixture: ComponentFixture<MyTaskHistoryV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTaskHistoryV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskHistoryV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
