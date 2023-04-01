import { app } from "./app";
import mongoose from "mongoose";
const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT Failed");
  if (!process.env.MONGO_URI) throw new Error("Mongodb URI must be defined");
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
  app.listen(3002, () => {
    console.log("COMMENT_SRV <-----> 3002");
  });
};

start();
