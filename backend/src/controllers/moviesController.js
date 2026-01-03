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
  if (!req.body || req.body.length === 0) {
    throw new Error("No data recived for bookMark items update");
  }
  try {
    const bulkOps = [];
    for (const item of data) {
      const movie = await Movie.findOne({ id: item.id });
      if (!movie) {
        return res
          .status(401)
          .send({ message: `Item with id "${item.id}" not Found` });
      }
      bulkOps.push({
        updateOne: {
          filter: { id: item.id },
          update: { $set: { bookMarked: item.bookMarked } },
        },
      });
      if (bulkOps.length > 0) {
        // const sendBulk = await Movie.findOneAndUpdate(
        //   { id: item.id },
        //   { $set: { bookMarked: item.bookMarked } }
        // );
      }
    }
    if (bulkOps.length > 1) {
      const sendBulk = await Movie.bulkWrite(bulkOps);

      if (!sendBulk) {
        return res
          .status(400)
          .send({ message: "Failed to process bulkWrite" });
      }
    }

    res.status(200).json({ message: "Items updated successfully " });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export { getMovies, handleUnload };
