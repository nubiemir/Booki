import express from "express";
import cors from "cors";
import {
  NotFoundError,
  errorHandler,
  currentUserMiddleware,
} from "@booki/common";
import cookieSession from "cookie-session";
import { newBook, deleteBook, likeBook, UpdateBook } from "./routes/app";

const app = express();

app.set("proxy", true);
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
  })
);
app.use(currentUserMiddleware);
app.use(newBook);
app.use(deleteBook);
app.use(UpdateBook);
app.use(likeBook);

// 404 error
app.use("*", (req, res) => {
  throw new NotFoundError();
});

// error handling
app.use(errorHandler);

export { app };
