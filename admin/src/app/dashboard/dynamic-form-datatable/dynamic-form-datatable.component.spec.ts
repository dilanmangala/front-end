import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormDatatableComponent } from './dynamic-form-datatable.component';

describe('DynamicFormDatatableComponent', () => {
  let component: DynamicFormDatatableComponent;
  let fixture: ComponentFixture<DynamicFormDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
