const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`);

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
  const post = {
    id: new Date(),
    date: new Date().toLocaleDateString(),
    title,
    author,
    text,
  };
  res.render(createPath("post"), { post, title });
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
