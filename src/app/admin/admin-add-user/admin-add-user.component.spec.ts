import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddUserComponent } from './admin-add-user.component';

describe('AdminAddUserComponent', () => {
  let component: AdminAddUserComponent;
  let fixture: ComponentFixture<AdminAddUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddUserComponent]
    });
    fixture = TestBed.createComponent(AdminAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
