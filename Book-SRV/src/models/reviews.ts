import mongoose from "mongoose";

/**
 * Reviews schema
 * Storage for the books:-
 * Rating &
 * Reviews
 */

/**
 * interface for the replay message
 * this one is used for the commentsSchema
 * it stores all the replays to a comment
 */

interface IReplay {
  replay: string;
}

/**
 * interface for the review docs comment section.
 * it stores all the comments ID's
 */

interface IReviewComment {
  commentId: mongoose.Schema.Types.ObjectId;
}

/**
 * the following interface
 * describes the attributes of a comment table or schema.
 */

interface IComments {
  comment: string;
  replay: IReplay[];
}

/**
 * the following interface
 * describes the attributes found on the Review schema or tabl
 */

interface IReview {
  rating: number;
  comment: IReviewComment;
}

/**
 * extending the mongoose doc for the sake
 * of adding the attributes of the comments Schema,
 */

interface CommentsDoc extends mongoose.Document {
  comment: string;
  replay: IReplay[];
}

/**
 * extending the mongoose doc for the sake
 * of adding the attributes of the revies Schema,
 */

export interface ReviewsDoc extends mongoose.Document {
  rating: string;
  comment: IReviewComment[];
}

interface CommentsModel extends mongoose.Model<CommentsDoc> {}

interface ReviewsModel extends mongoose.Model<ReviewsDoc> {}

/**
 * Comments Schema
 * will be referenced in the Reviews Schema in the
 * comment section.
 */
const CommentsSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    replay: [
      {
        replay: String,
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
 * Review Schema
 * storage for all the reviews and ratings of the book
 * will be referenced in the Books Schema in the
 * reviews section.
 */

const ReviewsSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    comment: [
      {
        commentId: mongoose.Schema.Types.ObjectId,
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
 * Building the comments model
 */

const Comment = mongoose.model<CommentsDoc, CommentsModel>(
  "Comment",
  CommentsSchema
);

/**
 * Building the Reviews model
 */
const Review = mongoose.model<ReviewsDoc, ReviewsModel>(
  "Review",
  ReviewsSchema
);

// exporting both the comments and Review model
export { Review, Comment };
