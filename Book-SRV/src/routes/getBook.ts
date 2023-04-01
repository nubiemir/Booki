import { BadRequestError, isAuth } from "@hthub/common";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../models/book";
const router = express.Router();

router.get(
  "/api/booki/:bookId",
  isAuth,
  async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const books = await Book.find({
      show: true,
      _id: bookId,
    }).populate("ownerId");

    if (!books) throw new BadRequestError("Sorry but no books found");
    res.send(books);
  }
);

export { router as getBook };
