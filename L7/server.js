const express = require("express");
const chalk = require("chalk");
const methodOverride = require("method-override");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const postRoutes = require("./routes/post-routes");
const postApiRoutes = require("./routes/api-post-routes");
const contactRoutes = require("./routes/contact-routes");
const createPath = require("./helpers/create-path");

const errorMsg = chalk.bgKeyword("white").redBright;
const successMsg = chalk.bgKeyword("green").white;

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => console.log(successMsg("Connect to DB")))
  .catch((error) => console.log(errorMsg(error)));

app.set("view engine", "ejs");

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`Listening port ${process.env.PORT}`));
});

app.use("", morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(express.urlencoded({ extended: false }));
app.use("/css", express.static("css"));
app.use(methodOverride("_method"));
app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.use(postRoutes);
app.use(postApiRoutes);
app.use(contactRoutes);

app.use((req, res) => {
  const title = "Error";
  res.status(404).render(createPath("error"), { title });
});
