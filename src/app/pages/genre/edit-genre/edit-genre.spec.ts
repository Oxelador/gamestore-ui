import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGenre } from './edit-genre';

describe('EditGenre', () => {
  let component: EditGenre;
  let fixture: ComponentFixture<EditGenre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGenre],
    }).compileComponents();

    fixture = TestBed.createComponent(EditGenre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
