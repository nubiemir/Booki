import { isAuth, NotFoundError, validateRequest } from "@hthub/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Comment } from "../models/comment";
import { Reply } from "../models/reply";

const router = express.Router();

router.put(
  "/api/comment/replay",
  [body("text").not().isEmpty(), body("commentId").not().isEmpty()],
  isAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { text, commentId } = req.body;
    const newReply = Reply.build({
      text: text,
      userId: "6424dd58ddda245fa5149cfb",
    });
    const comment = await Comment.findById(commentId);
    if (!comment) throw new NotFoundError();

    comment.reply = [...comment.reply, newReply];

    await comment.save();

    res.send(comment);
  }
);

export { router as replay };
