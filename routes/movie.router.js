const express = require("express");
const {
  getAllMovies,
  getMovieById,
  deleteMovieById,
  createMovie,
  updateMovieById,
} = require("../controller/movie.controller");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

router.get("/movie", verifyToken, getAllMovies);
router.get("/movie/:id", verifyToken, getMovieById);
router.put("/movie/:id", verifyToken, updateMovieById);
router.delete("/movie/:id", verifyToken, deleteMovieById);
router.post("/movie", verifyToken, createMovie);

module.exports = router;
