const express = require("express");
const moviesRouter = require("./routes/movie.router");

const app = express();

app.use(express.json());

app.use(moviesRouter);

app.listen(3000, () => {
  console.log("chill server connected");
});
