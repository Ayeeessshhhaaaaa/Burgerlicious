import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackScreenComponent } from './feedback-screen.component';

describe('FeedbackScreenComponent', () => {
  let component: FeedbackScreenComponent;
  let fixture: ComponentFixture<FeedbackScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackScreenComponent]
    });
    fixture = TestBed.createComponent(FeedbackScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
