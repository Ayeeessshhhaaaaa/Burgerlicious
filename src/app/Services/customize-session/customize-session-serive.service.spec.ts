import { TestBed } from '@angular/core/testing';

import { CustomizeSessionSeriveService } from './customize-session-serive.service';

describe('CustomizeSessionSeriveService', () => {
  let service: CustomizeSessionSeriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomizeSessionSeriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
