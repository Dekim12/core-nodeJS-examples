const http = require('http');
const fs = require('fs');
const path = require('path');

const parseRequestBody = body =>
  body.split('&').reduce((res, pairString) => {
    const [key, value] = pairString.split('=');
    res[key] = value;

    return res;
  }, {});

const handleError = (err, res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('You have an error: ' + err.message);
};

const server = http.createServer();

server.on('request', (req, res) => {
  switch (req.method) {
    case 'GET':
      const stream = fs.createReadStream(path.join(__dirname, 'form.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });

      stream.on('error', err => handleError(err, res));
      stream.pipe(res);
      break;
    case 'POST': {
      let body = '';

      req.setEncoding('utf-8');
      req.on('data', data => {
        body += data;
      });
      req.on('end', () => {
        const data = parseRequestBody(body);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(data));
      });
      break;
    }
  }
});

server.listen(3000, () => console.log('Server is working'));
