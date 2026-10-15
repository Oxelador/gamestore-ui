import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentCard } from './comment-card';

describe('CommentCard', () => {
  let component: CommentCard;
  let fixture: ComponentFixture<CommentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('comment', {
      id: 'comment-1',
      name: 'Player',
      body: 'Nice game',
      rating: 5,
      likes: 2,
      isLiked: false,
      childComments: [],
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds at most one like and removes it when clicked again', () => {
    component.toggleLike();

    expect(component.comment().likes).toBe(3);
    expect(component.comment().isLiked).toBe(true);

    component.toggleLike();

    expect(component.comment().likes).toBe(2);
    expect(component.comment().isLiked).toBe(false);
  });
});
