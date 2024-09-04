import { TestBed } from '@angular/core/testing';

import { NursesService } from './nurses.service';

describe('NursesService', () => {
  let service: NursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
