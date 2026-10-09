import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGame } from './edit-game';

describe('EditGame', () => {
  let component: EditGame;
  let fixture: ComponentFixture<EditGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGame],
    }).compileComponents();

    fixture = TestBed.createComponent(EditGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
