import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import moviesRouter from "./routing/moviesRouter.js";
import usersRouter from "./routing/usersRouter.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://entertainment-web-8mg2svhbg-tailung1s-projects.vercel.app",
    ],
  })
);
app.use(express.json());
// app.use(express.raw({ type: "application/json" }));

// app.post("/api/movies/unload", async (req, res) => {
//   const data = req.body;
//   console.log(data);
//   if (!req.body || req.body.length === 0) {
//     console.log("check failed", "no recived data");
//     return;
//   } else {
//     console.log(data, "valid?");
//   }
//   try {
//     console.log("LOOP");

//     for (const item of data) {
//       const movie = await Movie.findOne({ id: item.id });
//       if (movie) {
//         await Movie.findOneAndUpdate(
//           { id: movie.id },
//           {
//             bookMarked: item.bookMarked,
//           }
//         );
//       } else {
//         console.log(`Movie with id ${item.id} not found`);
//       }
//     }
//     res.status(200).json({ message: "Items updated successfully " });
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to update items (backend)",
//       error: err.message,
//     });
//   }
// });

app.use("/api/movies", moviesRouter);
app.use("/api/users", usersRouter);

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
