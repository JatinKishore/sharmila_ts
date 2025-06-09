import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowKitchenItemsComponent } from './show-kitchen-items.component';

describe('ShowKitchenItemsComponent', () => {
  let component: ShowKitchenItemsComponent;
  let fixture: ComponentFixture<ShowKitchenItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowKitchenItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowKitchenItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
