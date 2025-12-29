import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
    default: () => uuidv4(),
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  type: {
    type: String, // Array of genres
    required: true,
  },
  accessibility: {
    type: String,
    required: true,
  },
  bookMarked: {
    type: Boolean,
    default: false,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
