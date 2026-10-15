import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { OrderService } from '../../../services/order';
import { Orders } from '../orders';

describe('Orders', () => {
  let component: Orders;
  let fixture: ComponentFixture<Orders>;
  const orderService = {
    getPaidOrder: () =>
      of([
        {
          id: 'order-1',
          customerId: 'customer-1',
          date: new Date('2026-10-09'),
        },
      ]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orders],
      providers: [
        { provide: OrderService, useValue: orderService },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Orders);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the signed-in user paid orders', () => {
    expect(component.orders()).toEqual([
      {
        id: 'order-1',
        customerId: 'customer-1',
        date: new Date('2026-10-09'),
      },
    ]);
    expect(component.isLoading()).toBeFalse();
  });
});
