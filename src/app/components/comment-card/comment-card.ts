import { Component } from '@angular/core';
import { CommentUiModel } from '../../models/comment-ui.model';
import { input } from '@angular/core';
import { Rating } from '../rating/rating';

@Component({
  imports: [Rating],
  standalone: true,
  selector: 'app-comment-card',
  styleUrl: './comment-card.css',
  templateUrl: './comment-card.html',
})
export class CommentCard {
  comment = input.required<CommentUiModel>();

  like(): void {
    this.comment().likes = (this.comment().likes ?? 0) + 1;
  }

  likeChildComment(childComment: CommentUiModel): void {
    childComment.likes++;
  }
}
