const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post-routes");
const contactRoutes = require("./routes/contact-routes");
const createPath = require("./helpers/create-path");
const app = express();
const PORT = 3000;

const db =
  "mongodb://uv6otckgououvxt689qu:VbiMSCDFxL7S03WgwW9x@bkkkntiskw3klkk-mongodb.services.clever-cloud.com:27017/bkkkntiskw3klkk";

mongoose
  .connect(db)
  .then((res) => console.log("Connect to DB"))
  .catch((error) => console.log(error));

app.set("view engine", "ejs");

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
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
app.use(contactRoutes);

app.use((req, res) => {
  const title = "Error";
  res.status(404).render(createPath("error"), { title });
});
