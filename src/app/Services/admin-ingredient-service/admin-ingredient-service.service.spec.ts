import { TestBed } from '@angular/core/testing';

import { AdminIngredientServiceService } from './admin-ingredient-service.service';

describe('AdminIngredientServiceService', () => {
  let service: AdminIngredientServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminIngredientServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
