import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import {
  currentUserMiddleware,
  NotFoundError,
  validateRequest,
} from "@booki/common";
import { User } from "../model/user";
import { randomInt } from "node:crypto";

const router = express.Router();

router.post(
  "/api/users/verify",
  body("verification")
    .not()
    .isEmpty()
    .withMessage("Please provide verification number"),
  validateRequest,
  currentUserMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { verification } = req.body;
      const user = await User.findById(req.currentUser?.id);
      if (!user) throw new Error("User not found");

      if (verification !== user.verificationNumber)
        // verification does not match
        throw new Error("Verification Number does not much");
      if (user.expiresAt < new Date()) {
        // generate new verification number
        const verficationNumber = parseInt(
          randomInt(1000_000).toString().padStart(6, "0")
        );
        user.set({
          verficationNumber,
        });
        await user.save();

        // Send Email

        throw new Error(
          "Verification Number expired. New verification has been sent to your email"
        );
      }

      // user verified
      user.set({ isVerified: true });
      await user.save();

      // login in again
      req.session = null;

      res.status(201).json("Verfied");
    } catch (error) {
      next(error);
    }
  }
);

export { router as verifyEmailRouter };
