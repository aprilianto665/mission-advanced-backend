const express = require("express");
const {
  getAllMovies,
  getMovieById,
  deleteMovieById,
  createMovie,
  updateMovieById,
} = require("../controller/movie.controller");

const router = express.Router();

router.get("/movies", getAllMovies);
router.get("/movie/:id", getMovieById);
router.put("/movie/:id", updateMovieById);
router.delete("/movie/:id", deleteMovieById);
router.post("/movie", createMovie);

module.exports = router;
