import { BadRequestError, isAuth, NotAuthorizedError } from "@hthub/common";
import express, { Request, Response } from "express";
import { Book } from "../models/book";

const router = express.Router();

router.delete(
  "/api/booki/:bookId",
  isAuth,
  async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const book = await Book.findById(bookId).populate("ownerId");
    if (!book) throw new BadRequestError("Sorry book not found");
    if (book.ownerId.id !== req.currentUser!.id) throw new NotAuthorizedError();
    book.show = false;
    await book.save();
    res.send("deleted");
  }
);

export { router as deleteBook };
