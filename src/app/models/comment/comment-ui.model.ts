import { Comment } from './comment.model';

export interface CommentUiModel
  extends Omit<Comment, 'childComments'> {

    childComments: CommentUiModel[];

    rating: number;
    likes: number;
}