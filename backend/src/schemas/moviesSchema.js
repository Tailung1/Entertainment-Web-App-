import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid"


const movieSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default:()=>uuidv4()
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
    type: String, // To store the access level (-E, PG, +18)
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie