import { NO_ERRORS_SCHEMA } from "@angular/core";
import { DepartmentSearchComponent } from "./department-search.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("DepartmentSearchComponent", () => {

  let fixture: ComponentFixture<DepartmentSearchComponent>;
  let component: DepartmentSearchComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [DepartmentSearchComponent]
    });

    fixture = TestBed.createComponent(DepartmentSearchComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
