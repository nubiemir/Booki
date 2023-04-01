import mongoose from "mongoose";
import { CommentsDoc } from "../Comments-SRV/src/models/comment";
/**
 * Reviews schema
 * Storage for the books:-
 * Rating &
 * Reviews
 */

interface IReview {
  rating: number;
  comment: CommentsDoc[];
}

/**
 * extending the mongoose doc for the sake
 * of adding the attributes of the revies Schema,
 */

export interface ReviewsDoc extends mongoose.Document {
  rating: string;
  comment: CommentsDoc[];
}

interface ReviewsModel extends mongoose.Model<ReviewsDoc> {}

/**
 * Review Schema
 * storage for all the reviews and ratings of the book
 * will be referenced in the Books Schema in the
 * reviews section.
 */

const ReviewsSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
      },
    ],
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

/**
 * Building the Reviews model
 */
const Review = mongoose.model<ReviewsDoc, ReviewsModel>(
  "Review",
  ReviewsSchema
);

// exporting both the comments and Review model
export { Review };
