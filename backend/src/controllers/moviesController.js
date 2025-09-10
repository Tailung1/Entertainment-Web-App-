import Movie from "../schemas/moviesSchema.js";

const getMovies = async (req, res) => {
  try {
    const data = await Movie.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch movies",
      message: err.message,
    });
  }
};

export { getMovies };
