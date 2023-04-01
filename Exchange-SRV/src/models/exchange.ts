import mongoose from "mongoose";
import { BidDoc } from "./bid";

interface IExchange {
  book: string;
  bids: BidDoc[];
  approvedBid: BidDoc;
  rejectedBids: BidDoc[];
}

export interface ExchangeDoc extends mongoose.Document {
  book: string;
  bids: BidDoc[];
  approvedBid: BidDoc;
  rejectedBids: BidDoc[];
}

interface ExchangeModel extends mongoose.Model<ExchangeDoc> {
  build(attrs: IExchange): ExchangeDoc;
}

const exchangeSchema = new mongoose.Schema(
  {
    book: {
      type: String,
      required: true,
    },
    bids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
      },
    ],
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

exchangeSchema.statics.build = (attrs: IExchange) => {
  return new Exchange(attrs);
};

export const Exchange = mongoose.model<ExchangeDoc, ExchangeModel>(
  "Exchange",
  exchangeSchema
);
