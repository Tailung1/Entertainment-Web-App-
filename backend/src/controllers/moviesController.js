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

const handleUnload = async (req, res) => {
  const data = req.body;
   console.log("No data recived");
  if (!req.body || req.body.length === 0) {
    console.log("No data recived");
    return;
  }
  try {
    for (const item of data) {
      const movie = await Movie.findOne({ id: item.id });
      if (movie) {
        await Movie.findOneAndUpdate(
          { id: movie.id },
          {
            bookMarked: item.bookMarked,
          }
        );
      } else {
        console.log(`Movie with id ${item.id} not found`);
      }
    }
    res.status(200).json({ message: "Items updated successfully " });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update items (backend)",
      error: err.message,
    });
  }
};


export { getMovies, handleUnload };
