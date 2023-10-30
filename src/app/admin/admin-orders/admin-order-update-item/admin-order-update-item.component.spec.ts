import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderUpdateItemComponent } from './admin-order-update-item.component';

describe('AdminOrderUpdateItemComponent', () => {
  let component: AdminOrderUpdateItemComponent;
  let fixture: ComponentFixture<AdminOrderUpdateItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrderUpdateItemComponent]
    });
    fixture = TestBed.createComponent(AdminOrderUpdateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
