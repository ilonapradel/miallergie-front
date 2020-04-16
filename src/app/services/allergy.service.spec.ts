import { TestBed } from '@angular/core/testing';

import { AllergyService } from './allergy.service';

describe('AllergyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllergyService = TestBed.get(AllergyService);
    expect(service).toBeTruthy();
  });
});
