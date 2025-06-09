import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenItemsComponent } from './kitchen-items.component';

describe('KitchenItemsComponent', () => {
  let component: KitchenItemsComponent;
  let fixture: ComponentFixture<KitchenItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KitchenItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KitchenItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
