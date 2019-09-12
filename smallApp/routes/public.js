const fs = require('fs');
const path = require('path');

const handleError = res => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('We catch the error');
};

const public = (req, res) => {
  const fileExtension = path.extname(req.url);
  const filePath = req.url.slice(1);
  let contentType = '';

  switch (fileExtension) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    default:
      contentType = 'text/plain';
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', contentType);

  const stream = fs.createReadStream(path.resolve('public', filePath));

  stream.on('error', error => handleError(res));
  stream.pipe(res);
};

module.exports = public;
