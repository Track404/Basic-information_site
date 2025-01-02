const http = require('http');
const url = require('url');
const fs = require('fs');

http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename = '.' + q.pathname + '.html';
    if (q.pathname === '/') {
      fs.readFile('index.html', function (err, data) {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          return res.end('404 ERROR');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });
    } else if (q.pathname == '/index') {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 ERROR');
    } else {
      fs.readFile(filename, function (err, data) {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          return res.end('404 ERROR');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(8080);
