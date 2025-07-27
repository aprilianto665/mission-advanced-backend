const express = require("express");
const moviesRouter = require("./routes/movie.router");
const authRouter = require("./routes/auth.router");

const app = express();

app.use(express.json());

app.use(moviesRouter);
app.use(authRouter);

app.listen(3000, () => {
  console.log("chill server connected");
});
