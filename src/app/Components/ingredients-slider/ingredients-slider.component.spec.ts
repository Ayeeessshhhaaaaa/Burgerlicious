import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsSliderComponent } from './ingredients-slider.component';

describe('IngredientsSliderComponent', () => {
  let component: IngredientsSliderComponent;
  let fixture: ComponentFixture<IngredientsSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsSliderComponent]
    });
    fixture = TestBed.createComponent(IngredientsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
