import { Replay } from "./IReply";
import { Subjects } from "./types/Subjects";

export interface IReplyUpdatedPublisher extends Replay {
  subject: Subjects.PREPLYUPDATED;
}

export interface IReplyUpdatedListener extends Replay {
  subject: Subjects.SREPLYUPDATED;
}
