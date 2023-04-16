import { Replay } from "./IReply";
import { Subjects } from "./types/Subjects";

export interface IReplyCreatedPublisher extends Replay {
  subject: Subjects.PREPLYCREATED;
}

export interface IReplyCreatedListener extends Replay {
  subject: Subjects.SREPLYCREATED;
}
