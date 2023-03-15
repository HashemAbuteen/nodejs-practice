const http = require("node:http");

const server = http.createServer((req, res) => {
  res.end("hello from the server side");
  return;
});

server.listen(3000, () => {
  console.log("serevr is listining on port 3000");
});
