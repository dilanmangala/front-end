import { TestBed, inject } from '@angular/core/testing';

import { MyTaskHistoryService } from './my-task-history.service';

describe('MyTaskHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTaskHistoryService]
    });
  });

  it('should be created', inject([MyTaskHistoryService], (service: MyTaskHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
