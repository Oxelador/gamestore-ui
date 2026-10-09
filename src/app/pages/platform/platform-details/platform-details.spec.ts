import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformDetails } from './platform-details';

describe('PlatformDetails', () => {
  let component: PlatformDetails;
  let fixture: ComponentFixture<PlatformDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
