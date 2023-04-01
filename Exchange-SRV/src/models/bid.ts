import mongoose from "mongoose";
import { ExchangeStatus } from "../../Subjects/subjects";

interface IBid {
  book: string;
  bidder: string;
  status: ExchangeStatus;
}

export interface BidDoc extends mongoose.Document {
  book: string;
  bidder: string;
  status: ExchangeStatus;
}

interface BidModel extends mongoose.Model<BidDoc> {
  build(attrs: IBid): BidDoc;
}

const bidSchema = new mongoose.Schema(
  {
    book: {
      type: String,
      required: true,
    },
    bidder: {
      type: String,
      required: true,
    },
    status: {
      type: ExchangeStatus,
      enum: Object.values(ExchangeStatus),
      default: ExchangeStatus.PENDING,
    },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

bidSchema.statics.build = (attrs: BidDoc) => {
  return new Bid(attrs);
};

export const Bid = mongoose.model<BidDoc, BidModel>("Bid", bidSchema);
