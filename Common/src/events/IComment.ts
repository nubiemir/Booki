import { ObjectId } from "mongoose";
import { Subjects } from "./types/Subjects";

export interface Comment {
  subject: Subjects;
  data: {
    id: ObjectId;
    text: string;
    bookId: string;
    likes: string[];
    userId: string;
  };
}
