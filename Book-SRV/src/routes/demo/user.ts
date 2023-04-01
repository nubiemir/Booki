import { BadRequestError, isAuth } from "@hthub/common";
import express, { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";

interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const router = express.Router();

router.post(
  "/api/booki/user",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userExist = await User.findById(req.currentUser?.id);

      if (userExist) {
        throw new BadRequestError("user already exists");
      }

      const user = User.build({
        id: req.currentUser!.id,
        interests: ["Horror", "Sport", "Finance"],
      });
      await user.save();

      res.send(user);
    } catch (err) {
      return next(err);
    }
  }
);

export { router as newUser };
