import express from "express";
import cors from "cors";
import {
  currentuserRouter,
  forgetPasswordRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
  verifyEmailRouter,
  updatePasswordRouter,
} from "./routes";
import { NotFoundError, errorHandler } from "@booki/common";
import cookieSession from "cookie-session";
import mongoose, { Error } from "mongoose";
import { nats } from "./NatsWrapper";

const app = express();

app.set("proxy", true);
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    // secure: true,
    signed: false,
  })
);

// routes
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentuserRouter);
app.use(verifyEmailRouter);
app.use(forgetPasswordRouter);
app.use(updatePasswordRouter);

// 404 error
app.use("*", (req, res) => {
  throw new NotFoundError();
});

// error handling
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT Failed");
  if (!process.env.MONGO_URI) throw new Error("Mongodb URI must be defined");
  if (!process.env.NATS_URL) throw new Error("NATS_URL must defined");
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error("NATS_CLUSTER_ID must defined");

  try {
    await mongoose.connect(process.env.MONGO_URI);
    await nats.connect(process.env.NATS_URL, process.env.NATS_CLUSTER_ID);
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("Authentication -----> 3000");
  });
};

start();
