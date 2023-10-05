import { TestBed } from '@angular/core/testing';

import { AdminOrderServiceService } from './admin-order-service.service';

describe('AdminOrderServiceService', () => {
  let service: AdminOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOrderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
