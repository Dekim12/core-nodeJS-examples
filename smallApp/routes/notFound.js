const fs = require('fs');
const path = require('path');

const notFound = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  const stream = fs.createReadStream(path.resolve('public', 'error.html'));

  stream.on('error', error => {
    return stream.pipe(res);
  });
  stream.pipe(res);
};

module.exports = notFound;
