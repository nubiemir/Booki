import express from "express";
import { body } from "express-validator";
import jsonwebtoken from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@booki/common";
import { User } from "../model/user";
import { randomInt } from "node:crypto";
import {
  ExUserCreatedPublisher,
  UserCreatedPublisher,
} from "../events/publishers/userCreated";
import { nats } from "../NatsWrapper";

const router = express.Router();
const WINDOW_MINUTES_INTERVAL = 15 * 60;

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("uname")
      .trim()
      .not()
      .isEmpty()
      .withMessage("User name must be included"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 5 and 20")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      })
      .withMessage(
        "Passoword must include: 1 Upper case letter 1 lower case letter 1 Number 1 Sybmol"
      ),
  ],
  validateRequest,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { email, password, uname, interests } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new BadRequestError("Email already in use");
      }

      // generate verification number
      const verificationNumber = randomInt(1000_000)
        .toString()
        .padStart(6, "0");
      // calculate expiration date for verification
      const expiration = new Date();
      expiration.setSeconds(expiration.getSeconds() + WINDOW_MINUTES_INTERVAL);

      const newUser = User.build({
        email,
        password,
        verificationNumber,
        expiresAt: expiration,
        userName: uname,
      });

      await newUser.save();

      // send email

      const jwtToken = jsonwebtoken.sign(
        {
          id: newUser._id,
          email: newUser.email,
          verified: false,
        },
        process.env.JWT_KEY!
      );
      req.session = { jwt: jwtToken };
      new UserCreatedPublisher(nats.client).publish({
        email: newUser.email,
        uname: newUser.userName,
        id: newUser._id,
      });
      new ExUserCreatedPublisher(nats.client).publish({
        email: newUser.email,
        uname: newUser.userName,
        id: newUser._id,
      });
      res.status(201).json(newUser);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as signupRouter };
