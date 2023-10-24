import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIngredientsUpdateComponent } from './admin-ingredients-update.component';

describe('AdminIngredientsUpdateComponent', () => {
  let component: AdminIngredientsUpdateComponent;
  let fixture: ComponentFixture<AdminIngredientsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminIngredientsUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminIngredientsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
