import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MyTaskHistoryNavComponent } from "./my-task-history-nav.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("MyTaskHistoryNavComponent", () => {

  let fixture: ComponentFixture<MyTaskHistoryNavComponent>;
  let component: MyTaskHistoryNavComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [MyTaskHistoryNavComponent]
    });

    fixture = TestBed.createComponent(MyTaskHistoryNavComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
