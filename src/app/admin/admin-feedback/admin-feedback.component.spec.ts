import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeedbackComponent } from './admin-feedback.component';

describe('AdminFeedbackComponent', () => {
  let component: AdminFeedbackComponent;
  let fixture: ComponentFixture<AdminFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFeedbackComponent]
    });
    fixture = TestBed.createComponent(AdminFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
