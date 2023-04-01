import { isAuth, validateRequest } from "@hthub/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Book } from "../models/book";

const router = express.Router();

router.post(
  "/api/booki/new-book",
  isAuth,
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
  async (req: Request, res: Response) => {
    const id = req.currentUser!.id;
    const { title, author, description, genre, publishedDate } = req.body;
    const book = new Book({
      title,
      author,
      description,
      genre,
      publishedDate,
      ownerId: id,
      show: true,
    });

    await book.save();

    res.send(book);
  }
);

export { router as newBook };
