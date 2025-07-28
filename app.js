const express = require("express");
const moviesRouter = require("./routes/movie.router");
const authRouter = require("./routes/auth.router");
const uploadRouter = require("./routes/upload.router");
const notFoundMiddleware = require("./middlewares/404");

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(moviesRouter);
app.use(uploadRouter);

app.use("*", notFoundMiddleware);

app.listen(3000, () => {
  console.log("chill server connected");
});
