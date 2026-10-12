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

  like(): void {
    const comment = this.comment();

    comment.likes = (comment.likes ?? 0) + 1;
  }

  likeChildComment(childComment: CommentUiModel): void {
    childComment.likes++;
  }

  reply(): void {
    this.replyClicked.emit(this.comment());
  }

  quote(): void {
    this.quoteClicked.emit(this.comment());
  }
}
