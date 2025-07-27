const parseMovieFields = (movie) => ({
  ...movie,
  genre: JSON.parse(movie.genre),
  cast: JSON.parse(movie.cast),
  creators: JSON.parse(movie.creators),
});

const stringifyMovieFields = (data) => ({
  ...data,
  genre: JSON.stringify(data.genre),
  cast: JSON.stringify(data.cast),
  creators: JSON.stringify(data.creators),
});

const sendResponse = (res, statusCode, status, message, data) => {
  res.status(statusCode).json({ status, message, data });
};

const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ status: "error", message });
};

module.exports = {
  parseMovieFields,
  stringifyMovieFields,
  sendResponse,
  sendErrorResponse,
};
