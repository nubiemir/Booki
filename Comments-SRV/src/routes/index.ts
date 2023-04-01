import { isAuth, validateRequest } from "@hthub/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Comment } from "../models/comment";

const router = express.Router();

router.post(
  "/api/comment/new",
  [body("text").not().isEmpty()],
  isAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { text } = req.body;
    const comment = Comment.build({
      bookId: "6424e023a6a8ce30e6e65582",
      userId: "6424dd58ddda245fa5149cfb",
      text: text,
      reply: [],
      likes: 0,
    });

    await comment.save();

    res.send(comment);
  }
);

export { router as newComment };
