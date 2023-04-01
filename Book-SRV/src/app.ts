import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import {
  NotFoundError,
  errorHandler,
  currentUserMiddleware,
} from "@hthub/common";
import cookieSession from "cookie-session";
import {
  newBook,
  getBook,
  ViewBooks,
  deleteBook,
  bookiHome,
  UpdateBook,
} from "./routes/app";
import { newUser } from "./routes/demo/user";

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
app.use(newUser);
app.use(bookiHome);
app.use(newBook);
app.use(ViewBooks);
app.use(getBook);
app.use(deleteBook);
app.use(UpdateBook);

// 404 error
app.use("*", (req, res) => {
  throw new NotFoundError();
});

// error handling
app.use(errorHandler);

export { app };
