import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsUpdateComponent } from './admin-products-update.component';

describe('AdminProductsUpdateComponent', () => {
  let component: AdminProductsUpdateComponent;
  let fixture: ComponentFixture<AdminProductsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductsUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminProductsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
