import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenreDetails } from './genre-details';

describe('GenreDetails', () => {
  let component: GenreDetails;
  let fixture: ComponentFixture<GenreDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(GenreDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
