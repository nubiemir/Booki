import mongoose from "mongoose";
import { UserDoc } from "../models/user";

/**
 * Books schema
 * Storage for the books details:-
 */

/**
 * interface for the exchange request
 * this one is used int IBook interface for the exchangeRequest attribute
 */

/**
 * the following interface
 * describes the attributes found on the Book schema or tabl
 */

interface IBook {
  title: string;
  author: string;
  description: string;
  genre: string;
  coverImageUrl: string;
  publishedDate: Date;
  ownerId: UserDoc;
  show: boolean;
}

/**
 * extending the mongoose doc for the sake
 * of adding the attributes of the Book Schema,
 */

export interface BookDoc extends mongoose.Document {
  title: string;
  author: string;
  description: string;
  genre: string;
  coverImageUrl: string;
  publishedDate: Date;
  ownerId: UserDoc;
  show: boolean;
}

interface BookModel extends mongoose.Model<BookDoc> {
  build(attrs: IBook): BookDoc;
}

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
      default: "test",
    },
    publishedDate: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    show: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
      default: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

BookSchema.statics.build = (attrs: IBook) => {
  return new Book(attrs);
};

/**
 * Building the Book model
 */

const Book = mongoose.model<BookDoc, BookModel>("Book", BookSchema);

// exporting the Book model
export { Book };
