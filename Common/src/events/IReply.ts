import { ObjectId } from "mongoose";
import { Subjects } from "./types/Subjects";

export interface Replay {
  subject: Subjects;
  data: {
    id: ObjectId;
    userId: string;
    text: string;
    likes: string[];
    commentId: string;
  };
}
