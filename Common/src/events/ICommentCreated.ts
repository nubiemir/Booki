import { Comment } from "./IComment";
import { Subjects } from "./types/Subjects";

export interface ICommentCreatedPublisher extends Comment {
  subject: Subjects.PCOMMENTCREATED;
}

export interface ICommentCreatedListener extends Comment {
  subject: Subjects.SCOMMENTCREATED;
}
