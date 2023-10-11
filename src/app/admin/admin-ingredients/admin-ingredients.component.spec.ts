import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIngredientsComponent } from './admin-ingredients.component';

describe('AdminIngredientsComponent', () => {
  let component: AdminIngredientsComponent;
  let fixture: ComponentFixture<AdminIngredientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminIngredientsComponent]
    });
    fixture = TestBed.createComponent(AdminIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
