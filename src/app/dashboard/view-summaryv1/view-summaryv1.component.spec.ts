import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSummaryv1Component } from './view-summaryv1.component';

describe('ViewSummaryv1Component', () => {
  let component: ViewSummaryv1Component;
  let fixture: ComponentFixture<ViewSummaryv1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSummaryv1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSummaryv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
