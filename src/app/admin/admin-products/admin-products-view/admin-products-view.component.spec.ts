import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsViewComponent } from './admin-products-view.component';

describe('AdminProductsViewComponent', () => {
  let component: AdminProductsViewComponent;
  let fixture: ComponentFixture<AdminProductsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductsViewComponent]
    });
    fixture = TestBed.createComponent(AdminProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
