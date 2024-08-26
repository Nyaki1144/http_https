// server.js
const https = require("https");
const fs = require("fs");
const path = require("path");

const PORT = 8000;

const options = {
  key: fs.readFileSync(path.join(__dirname, "private.key")),
  cert: fs.readFileSync(path.join(__dirname, "certificate.crt")),
};

const server = https.createServer(options, (req, res) => {
  console.log(req);

  if (req.url === "/" || req.url === "/index.html") {
    const filePath = path.join(__dirname, "index.html");

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} with SSL`);
});
