import { TestBed } from '@angular/core/testing';

import { IngrediantService } from './ingrediant.service';

describe('IngrediantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngrediantService = TestBed.get(IngrediantService);
    expect(service).toBeTruthy();
  });
});
