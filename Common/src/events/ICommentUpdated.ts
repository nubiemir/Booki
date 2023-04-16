import { Comment } from "./IComment";
import { Subjects } from "./types/Subjects";

export interface ICommentUpdatedPublisher extends Comment {
  subject: Subjects.PCOMMENTUPDATED;
}

export interface ICommentUpdatededListener extends Comment {
  subject: Subjects.SCOMMENTUPDATED;
}
