import { isAuth } from "@booki/common";
import express, { Request, Response } from "express";
import { Comment } from "../Comments-SRV/src/models/comment";

const router = express.Router();

router.get(
  "/api/comment/:bookId",
  isAuth,
  async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const comments = await Comment.find({ bookId: bookId });
    res.send(comments);
  }
);

export { router as bookComments };
