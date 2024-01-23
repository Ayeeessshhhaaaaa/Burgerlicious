import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminErrorPageComponent } from './admin-error-page.component';

describe('AdminErrorPageComponent', () => {
  let component: AdminErrorPageComponent;
  let fixture: ComponentFixture<AdminErrorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminErrorPageComponent]
    });
    fixture = TestBed.createComponent(AdminErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
