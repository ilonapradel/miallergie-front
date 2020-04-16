import { TestBed } from '@angular/core/testing';

import { IntoleranceService } from './intolerance.service';

describe('IntoleranceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntoleranceService = TestBed.get(IntoleranceService);
    expect(service).toBeTruthy();
  });
});
