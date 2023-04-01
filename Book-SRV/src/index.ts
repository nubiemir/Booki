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
  app.listen(3001, () => {
    console.log("BOOK_SRV <-----> 3001");
  });
};

start();
