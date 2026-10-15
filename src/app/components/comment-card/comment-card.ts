import { Component, output } from '@angular/core';
import { CommentUiModel } from '../../models/comment/comment-ui.model';
import { input } from '@angular/core';
import { Rating } from '../rating/rating';

@Component({
  imports: [Rating, CommentCard],
  standalone: true,
  selector: 'app-comment-card',
  styleUrl: './comment-card.css',
  templateUrl: './comment-card.html',
})
export class CommentCard {
  comment = input.required<CommentUiModel>();
  replyClicked = output<CommentUiModel>();
  quoteClicked = output<CommentUiModel>();

  toggleLike(): void {
    const comment = this.comment();

    comment.isLiked = !comment.isLiked;
    comment.likes = Math.max(0, comment.likes + (comment.isLiked ? 1 : -1));
  }

  reply(): void {
    this.replyClicked.emit(this.comment());
  }

  quote(): void {
    this.quoteClicked.emit(this.comment());
  }
}
