const http = require('http');
const fs = require('fs');
const path = require('path');

const handleError = (error, res) => {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end(`We have some error: ${error.message}`);
};
const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    const stream = fs.createReadStream(
      path.join(__dirname, 'public', 'index.html')
    );

    stream.on('error', err => handleError(err));

    res.writeHead(200, { 'Content-Type': 'text/html' });
    stream.pipe(res);
  } else if (req.url.match(/.css$/)) {
    const stream = fs.createReadStream(path.join(__dirname, 'public', req.url));

    stream.on('error', err => handleError(err));

    res.writeHead(200, { 'Content-Type': 'text/css' });
    stream.pipe(res);
  } else if (req.url.match(/.js$/)) {
    const stream = fs.createReadStream(path.join(__dirname, 'public', req.url));

    stream.on('error', err => handleError(err));

    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    stream.pipe(res);
  } else if (req.url.match(/.png$/)) {
    const stream = fs.createReadStream(path.join(__dirname, 'public', req.url));

    stream.on('error', err => handleError(err));

    res.writeHead(200, { 'Content-Type': 'image/png' });
    stream.pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`Check path. Status code is 404.`);
  }
});

server.listen(3000, () => {
  console.log('Server start');
});
