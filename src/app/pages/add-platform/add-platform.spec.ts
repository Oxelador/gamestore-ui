import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPlatform } from './add-platform';

describe('AddPlatform', () => {
  let component: AddPlatform;
  let fixture: ComponentFixture<AddPlatform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlatform],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlatform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
