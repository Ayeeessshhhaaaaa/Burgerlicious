import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIngredientsAddComponent } from './admin-ingredients-add.component';

describe('AdminIngredientsAddComponent', () => {
  let component: AdminIngredientsAddComponent;
  let fixture: ComponentFixture<AdminIngredientsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminIngredientsAddComponent]
    });
    fixture = TestBed.createComponent(AdminIngredientsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
