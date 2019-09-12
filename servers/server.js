const http = require('http');
const { htmlTemplate, cssTemplate, jsTemplate } = require('./responseData');

const server = http.createServer();

server.on('request', (req, res) => {
  switch (req.url) {
    case '/': {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlTemplate);
      break;
    }
    case '/app.css': {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(cssTemplate);
      break;
    }
    case '/app.js': {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(jsTemplate);
      break;
    }
    default: {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Something went wrong. Status code - 404');
    }
  }
});

server.listen(3000, () => {
  console.log('Server start');
});
