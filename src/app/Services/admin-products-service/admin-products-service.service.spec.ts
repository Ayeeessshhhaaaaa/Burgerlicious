import { TestBed } from '@angular/core/testing';

import { AdminProductsServiceService } from './admin-products-service.service';

describe('AdminProductsServiceService', () => {
  let service: AdminProductsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
