import { TestBed } from '@angular/core/testing';

import { StdentService } from './student.service';

describe('StdentService', () => {
  let service: StdentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StdentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
