/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DonutChartV1Component } from './donut-chartV1.component';

describe('DonutChartV1Component', () => {
  let component: DonutChartV1Component;
  let fixture: ComponentFixture<DonutChartV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutChartV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutChartV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
