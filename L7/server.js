const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

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
  res.render(createPath("post"), { title });
});

app.get("/posts", (req, res) => {
  const title = "Posts";
  res.render(createPath("posts"), { title });
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
