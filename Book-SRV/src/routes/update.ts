import {
  BadRequestError,
  isAuth,
  NotAuthorizedError,
  validateRequest,
} from "@hthub/common";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { Book } from "../models/book";

const router = express.Router();

router.put(
  "/api/booki/:bookId",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("author").not().isEmpty().withMessage("Author is required"),
    body("description").not().isEmpty().withMessage("Description is required"),
    body("genre").not().isEmpty().withMessage("Genre is required"),
    body("publishedDate")
      .not()
      .isEmpty()
      .withMessage("Published date is required"),
  ],
  validateRequest,
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      const book = await Book.findById(bookId).populate("ownerId");
      if (!book) throw new BadRequestError("Sorry book not found");
      if (book.ownerId.id !== req.currentUser!.id)
        throw new NotAuthorizedError();
      const { title, author, description, genre, publishedDate } = req.body;
      book.set({ title, author, description, genre, publishedDate });
      await book.save();
      res.send(book);
    } catch (err) {
      return next(err);
    }
  }
);

export { router as UpdateBook };
