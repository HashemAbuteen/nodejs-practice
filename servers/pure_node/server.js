const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end();
    return;
  }

  // handle routes
  if (req.url === "/raw-html") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Welcome</h1>");
    res.end();
  } else if (req.url === "/users") {
    const usersPath = path.join(__dirname, "users.json");
    fs.readFile(usersPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end();
        return;
      }
      res.setHeader("Content-Type", "application/json");
      res.write(data);
      res.end();
    });
  } else if (req.url === "/") {
    const htmlPath = path.join(__dirname, "index.html");
    fs.readFile(htmlPath, (err, html) => {
      if (err) {
        res.statusCode = 500;
        res.end();
        return;
      }
      const cssPath = path.join(__dirname, "index.css");
      fs.readFile(cssPath, (err, css) => {
        if (err) {
          res.statusCode = 500;
          res.end();
          return;
        }
        const jsPath = path.join(__dirname, "index.js");
        fs.readFile(jsPath, (err, js) => {
          if (err) {
            res.statusCode = 500;
            res.end();
            return;
          }
          res.write(js);
          res.end();
        });
      });
    });
  } else if (req.url === "/index.css") {
    const cssPath = path.join(__dirname, "index.css");
    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end();
        return;
      }
      res.setHeader("Content-Type", "text/css");
      res.write(data);
      res.end();
    });
  } else if (req.url === "/index.js") {
    const jsPath = path.join(__dirname, "index.js");
    fs.readFile(jsPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end();
        return;
      }
      res.setHeader("Content-Type", "text/javascript");
      res.write(data);
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
