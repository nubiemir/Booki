import { ObjectId } from "mongoose";
import { Subjects } from "./types/Subjects";

export interface CBook {
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
    likes: string[];
    cloudinaryPublicId: string | undefined;
  };
}

export interface Book {
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
    likes: string[];
    cloudinaryPublicId: string | undefined;
  };
}
