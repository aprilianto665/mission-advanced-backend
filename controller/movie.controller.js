const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const {
  parseMovieFields,
  stringifyMovieFields,
  sendResponse,
  sendErrorResponse,
} = require("../utils/movieUtils");

const getAllMovies = async (req, res) => {
  try {
    const result = await prisma.movie.findMany();
    const movies = result.map(parseMovieFields);
    sendResponse(res, 200, "success", "Movies retrieved successfully", movies);
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.movie.findUnique({
      where: { id: Number(id) },
    });

    if (!result) {
      return sendErrorResponse(res, 404, "Movie not found");
    }

    sendResponse(
      res,
      200,
      "success",
      "Movie retrieved successfully",
      parseMovieFields(result)
    );
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

const updateMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = stringifyMovieFields(req.body);

    const result = await prisma.movie.update({
      where: { id: Number(id) },
      data,
    });

    sendResponse(
      res,
      200,
      "success",
      "Movie updated successfully",
      parseMovieFields(result)
    );
  } catch (error) {
    if (error.code === "P2025") {
      return sendErrorResponse(res, 404, "Movie not found");
    }
    sendErrorResponse(res, 500, error.message);
  }
};

const deleteMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.movie.delete({
      where: { id: Number(id) },
    });

    sendResponse(
      res,
      200,
      "success",
      "Movie deleted successfully",
      parseMovieFields(result)
    );
  } catch (error) {
    if (error.code === "P2025") {
      return sendErrorResponse(res, 404, "Movie not found");
    }
    sendErrorResponse(res, 500, error.message);
  }
};

const createMovie = async (req, res) => {
  try {
    const result = await prisma.movie.create({
      data: stringifyMovieFields(req.body),
    });

    sendResponse(
      res,
      201,
      "success",
      "Movie created successfully",
      parseMovieFields(result)
    );
  } catch (error) {
    sendErrorResponse(res, 400, error.message);
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  createMovie,
};
