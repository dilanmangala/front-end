import { DynamicFormServiceService } from "./dynamic-form.service";
import { TestBed } from "@angular/core/testing";

describe("DynamicFormServiceService", () => {

  let service: DynamicFormServiceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormServiceService
      ]
    });
    service = TestBed.get(DynamicFormServiceService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
