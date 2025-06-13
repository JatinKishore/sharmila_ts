import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipDetailsComponent } from './payslip-details.component';

describe('PayslipDetailsComponent', () => {
  let component: PayslipDetailsComponent;
  let fixture: ComponentFixture<PayslipDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayslipDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayslipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
