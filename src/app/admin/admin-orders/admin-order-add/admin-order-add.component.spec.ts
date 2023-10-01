import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderAddComponent } from './admin-order-add.component';

describe('AdminOrderAddComponent', () => {
  let component: AdminOrderAddComponent;
  let fixture: ComponentFixture<AdminOrderAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrderAddComponent]
    });
    fixture = TestBed.createComponent(AdminOrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
