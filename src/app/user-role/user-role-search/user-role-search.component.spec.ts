import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleSearchComponent } from './user-role-search.component';

describe('UserRoleSearchComponent', () => {
  let component: UserRoleSearchComponent;
  let fixture: ComponentFixture<UserRoleSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
