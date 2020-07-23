import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifiedReasonComponent } from './add-modified-reason.component';

describe('AddModifiedReasonComponent', () => {
  let component: AddModifiedReasonComponent;
  let fixture: ComponentFixture<AddModifiedReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModifiedReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifiedReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
