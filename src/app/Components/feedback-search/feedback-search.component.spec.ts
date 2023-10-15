import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSearchComponent } from './feedback-search.component';

describe('FeedbackSearchComponent', () => {
  let component: FeedbackSearchComponent;
  let fixture: ComponentFixture<FeedbackSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackSearchComponent]
    });
    fixture = TestBed.createComponent(FeedbackSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
