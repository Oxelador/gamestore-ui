export interface CreateCommentRequest {
  comment: {
    id?: string;
    body: string;
  };

  parentId?: string;

  action?: string;
}
