const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} '${req.originalUrl}' not found`,
  });
};

module.exports = notFoundMiddleware;
