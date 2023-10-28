import { TestBed } from '@angular/core/testing';

import { AdminFeedbackServiceService } from './admin-feedback-service.service';

describe('AdminFeedbackServiceService', () => {
  let service: AdminFeedbackServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFeedbackServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
