import express from "express";
import {
  getMovies,
  handleUnload,
} from "../controllers/moviesController.js";

const router = express.Router();

router.get("/", getMovies);
router.patch("/unload", handleUnload);

export default router;
