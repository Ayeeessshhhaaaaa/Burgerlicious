import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeScreenComponent } from './customize-screen.component';

describe('CustomizeScreenComponent', () => {
  let component: CustomizeScreenComponent;
  let fixture: ComponentFixture<CustomizeScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizeScreenComponent]
    });
    fixture = TestBed.createComponent(CustomizeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
