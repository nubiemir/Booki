import { ObjectId } from "mongoose";
import { Subjects } from "./types/Subjects";

export interface Book {
  subject: Subjects;
  data: { id: ObjectId };
}

export interface QBook {
  subject: Subjects;
  data: {
    id: ObjectId;
    title: string;
    author: string;
    description: string;
    genre: string[];
    coverImage: string;
    publishedDate: Date;
    ownerId: ObjectId;
    condition: string;
    comments: ObjectId[];
  };
}

export interface EBook {
  subject: Subjects;
  data: {
    id: ObjectId;
    title: string;
    author: string;
    description: string;
    genre: string[];
    coverImage: string;
    publishedDate: Date;
    ownerId: ObjectId;
    condition: string;
  };
}
