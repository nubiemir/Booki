import { BadRequestError, isAuth } from "@hthub/common";
import express, { Request, Response } from "express";
import { Book } from "../models/book";
const router = express.Router();

router.get(
  "/api/booki/view-my-books",
  isAuth,
  async (req: Request, res: Response) => {
    const books = await Book.find({
      show: true,
      ownerId: req.currentUser?.id,
    }).populate("ownerId");

    if (!books) throw new BadRequestError("Sorry but no books found");
    res.send(books);
  }
);

export { router as ViewBooks };
