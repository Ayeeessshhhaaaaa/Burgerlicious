import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDetailsScreenComponent } from './feedback-details-screen.component';

describe('FeedbackDetailsScreenComponent', () => {
  let component: FeedbackDetailsScreenComponent;
  let fixture: ComponentFixture<FeedbackDetailsScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackDetailsScreenComponent]
    });
    fixture = TestBed.createComponent(FeedbackDetailsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
