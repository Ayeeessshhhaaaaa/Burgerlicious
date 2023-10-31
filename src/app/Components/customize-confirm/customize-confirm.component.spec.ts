import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeConfirmComponent } from './customize-confirm.component';

describe('CustomizeConfirmComponent', () => {
  let component: CustomizeConfirmComponent;
  let fixture: ComponentFixture<CustomizeConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizeConfirmComponent]
    });
    fixture = TestBed.createComponent(CustomizeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
