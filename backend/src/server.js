import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import moviesRouter from "./routing/moviesRouter.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", moviesRouter);

const mongoURL = process.env.MONGO_URL;

if (!mongoURL) {
  throw new Error("Environment variable 'MONGO_URL' doesn't exist");
}

const port =
  process.env.PORT && !isNaN(Number(process.env.PORT))
    ? Number(process.env.PORT)
    : 3000;

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
