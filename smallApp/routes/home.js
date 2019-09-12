const fs = require('fs');
const path = require('path');

const notFound = require('./notFound');

const home = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  const stream = fs.createReadStream(path.resolve('public', 'index.html'));

  stream.on('error', error => {
    return notFound(req, res);
  });
  stream.pipe(res);
};

module.exports = home;
