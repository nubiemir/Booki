import { BadRequestError, isAuth, validateRequest } from "@hthub/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Comment } from "../models/comment";

const router = express.Router();

router.put(
  "/api/comments/likeComment",
  [body("commentId").not().isEmpty().withMessage("No comment provided")],
  validateRequest,
  isAuth,
  async (req: Request, res: Response) => {
    const { commentId } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) throw new BadRequestError("Comment not found");
    comment.likes++;
    await comment.save();

    res.send(comment);
  }
);

export { router as likeComment };
