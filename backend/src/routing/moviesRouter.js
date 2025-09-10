import express from "express";
import { getMovies } from "../controllers/moviesController.js";

const router = express.Router();

router.get("/movies",getMovies)

export default router
