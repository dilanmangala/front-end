import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbAdjustmentsComponent } from './breadcrumb-adjustments.component';

describe('BreadcrumbAdjustmentsComponent', () => {
  let component: BreadcrumbAdjustmentsComponent;
  let fixture: ComponentFixture<BreadcrumbAdjustmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbAdjustmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
