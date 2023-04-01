import { isAuth } from "@hthub/common";
import express, { Request, Response } from "express";
import { Comment } from "../Comments-SRV/src/models/comment";

const router = express.Router();

router.get("/api/comment/view", isAuth, async (req: Request, res: Response) => {
  const comments = await Comment.find();
  res.send(comments);
});

export { router as getAll };
