import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment/comment.model';
import { CreateCommentRequest } from '../models/comment/comment-create-request.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments(key: string) {
    return this.http.get<Comment[]>(`${environment.apiUrl}/games/${key}/comments`);
  }

  addComment(key: string, request: CreateCommentRequest) {
    return this.http.post<Comment>(`${environment.apiUrl}/games/${key}/comments`, request);
  }
}
