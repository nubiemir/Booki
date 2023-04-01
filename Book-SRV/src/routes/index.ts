import { BadRequestError, isAuth } from "@hthub/common";
import express, { Request, Response } from "express";
import { Book } from "../models/book";
const router = express.Router();

router.get("/api/booki/home", isAuth, async (req: Request, res: Response) => {
  const books = await Book.find({ show: true }).populate("ownerId");

  if (!books) throw new BadRequestError("Sorry but no books found");
  res.send(books);
});

export { router as bookiHome };
