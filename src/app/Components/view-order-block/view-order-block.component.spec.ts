import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderBlockComponent } from './view-order-block.component';

describe('ViewOrderBlockComponent', () => {
  let component: ViewOrderBlockComponent;
  let fixture: ComponentFixture<ViewOrderBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOrderBlockComponent]
    });
    fixture = TestBed.createComponent(ViewOrderBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
