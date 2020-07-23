import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleLoginTimeComponent } from './user-role-login-time.component';

describe('UserRoleLoginTimeComponent', () => {
  let component: UserRoleLoginTimeComponent;
  let fixture: ComponentFixture<UserRoleLoginTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleLoginTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleLoginTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
