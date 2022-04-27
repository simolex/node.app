const http = require("http");

const PORT = 3000;

const server = http.createServer((req, resp) => {
  console.log(req.url, req.method);

  //   resp.setHeader("Content-Type", "text/html");
  //   resp.write('<head><link rel="stylesheet" href="#"></head>');
  //   resp.write("<h1> Hello world!</h1>");
  //   resp.write("<p>Hello world!</p>");

  resp.setHeader("Content-Type", "application/json");
  const data = JSON.stringify([
    {
      name: "Tommy",
      age: 35,
    },
    {
      name: "Arthur",
      age: 40,
    },
  ]);
  resp.end(data);
});

server.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});
