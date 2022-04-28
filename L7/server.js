const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Post = require("./models/post");
const app = express();
const PORT = 3000;

const db =
  "mongodb://uv6otckgououvxt689qu:VbiMSCDFxL7S03WgwW9x@bkkkntiskw3klkk-mongodb.services.clever-cloud.com:27017/bkkkntiskw3klkk";

const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`);

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
app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.get("/contacts", (req, res) => {
  const title = "Contacts";
  const contacts = [
    { name: "c-1", link: "#" },
    { name: "c-2", link: "#" },
    { name: "c-3", link: "#" },
  ];
  res.render(createPath("contacts"), { title, contacts });
});

app.get("/posts/:id", (req, res) => {
  const title = "Post";
  const post = {
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.",
    title: "Post title",
    date: "05.05.2021",
    author: "Yauhen",
  };
  res.render(createPath("post"), { title, post });
});

app.post("/add-post", (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({
    title,
    author,
    text,
  });
  post
    .save()
    .then((result) => res.send(result))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.get("/posts", (req, res) => {
  const title = "Posts";
  const posts = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.",
      title: "Post title",
      date: "05.05.2021",
      author: "Yauhen",
    },
    {
      id: 2,
      text: " Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.",
      title: "Post title 2",
      date: "05.05.2020",
      author: "Jone",
    },
  ];
  res.render(createPath("posts"), { title, posts });
});

app.get("/add-post", (req, res) => {
  const title = "New Post";
  res.render(createPath("add-post"), { title });
});

app.get("/about-us", (req, res) => {
  res.redirect("/contacts");
});

app.use((req, res) => {
  const title = "Error";
  res.status(404).render(createPath("error"), { title });
});
