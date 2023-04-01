import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import {
  NotFoundError,
  errorHandler,
  currentUserMiddleware,
} from "@hthub/common";
import cookieSession from "cookie-session";

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

// 404 error
app.use("*", (req, res) => {
  throw new NotFoundError();
});

// error handling
app.use(errorHandler);

export { app };
