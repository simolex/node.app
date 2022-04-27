const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, resp) => {
  console.log("Server request");

  resp.setHeader("Content-Type", "text/html");

  const createPath = (page) => path.resolve(__dirname, "views", `${page}.html`);

  let basePath = "";

  switch (req.url) {
    case "/":
    case "/home":
    case "/index.html":
      basePath = createPath("index");
      resp.statusCode = 200;
      break;
    case "/about-us":
      resp.statusCode = 301;
      resp.setHeader("Location", "/contacts");
      resp.end();
      break;
    case "/contacts":
      basePath = createPath("contacts");
      resp.statusCode = 200;
      break;
    default:
      basePath = createPath("error");
      resp.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      resp.statusCode = 500;
    } else {
      resp.write(data);
    }
    resp.end();
  });
});

server.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});
