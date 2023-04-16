import { ObjectId } from "mongoose";
import { Subjects } from "./types/Subjects";

export interface User {
  subject: Subjects;
  data: {
    email: string;
    uname: string;
    interests: string[];
    id: ObjectId;
  };
}
