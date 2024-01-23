import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastOrderBlockComponent } from './past-order-block.component';

describe('PastOrderBlockComponent', () => {
  let component: PastOrderBlockComponent;
  let fixture: ComponentFixture<PastOrderBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PastOrderBlockComponent]
    });
    fixture = TestBed.createComponent(PastOrderBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
