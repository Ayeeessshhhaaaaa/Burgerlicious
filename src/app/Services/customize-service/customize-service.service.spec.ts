import { TestBed } from '@angular/core/testing';

import { CustomizeServiceService } from './customize-service.service';

describe('CustomizeServiceService', () => {
  let service: CustomizeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomizeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
