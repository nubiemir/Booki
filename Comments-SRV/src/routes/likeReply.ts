import { BadRequestError, isAuth, validateRequest } from "@hthub/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Comment } from "../models/comment";

const router = express.Router();

router.put(
  "/api/comments/likeReply",
  [body("replyId").not().isEmpty().withMessage("No reply given")],
  validateRequest,
  isAuth,
  async (req: Request, res: Response) => {
    const { replyId, commentId } = req.body;
    console.log(replyId);

    // const reply = await Reply.findById(replyId);
    const comment = await Comment.findOne({
      _id: commentId,
      "reply._id": replyId,
    });

    if (!comment) throw new BadRequestError("No comment found");
    comment.reply.map((rep) => {
      if (rep.id === replyId) {
        return rep.likes++;
      }
      return rep;
    });

    await comment.save();
    // await reply.save();

    res.send(comment);
  }
);

export { router as likeReply };
