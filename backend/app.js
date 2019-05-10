/** Sinwaves express app. */

const express = require("express");
const bodyParser = require("body-parser");
const imageRoutes = require("./routes/urls");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/urls", imageRoutes);

/** 404 Not Found handler. */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/** Generic error handler. */

app.use(function (err, req, res, next) {
  if (err.stack) console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message,
  });
});


module.exports = app;