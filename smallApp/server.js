const http = require('http');

const { public, home, search, notFound } = require('./routes');

const handleError = res => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
};

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url.match(/.(html|css|js|png|jpg)$/)) {
    public(req, res);
  } else if (req.url === '/') {
    home(req, res);
  } else if (req.url.startsWith('/search')) {
    search(req, res);
  } else {
    notFound(req, res);
  }
});

server.listen(3000, () => console.log('Server work.'));
