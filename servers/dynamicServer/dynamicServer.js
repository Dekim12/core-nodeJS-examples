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

const renderTemplate = (template, data, doneCallback) => {
  fs.readFile(
    path.join(__dirname, 'templates', `${template}.some`),
    'utf-8',
    (error, file) => {
      if (error) {
        return doneCallback(err);
      }

      let htmTemplate = file;

      for (let prop in data) {
        htmTemplate = htmTemplate.replace(`{${prop}}`, data[prop]);
      }

      doneCallback(null, htmTemplate);
    }
  );
};

const server = http.createServer();

server.on('request', (req, res) => {
  switch (req.method) {
    case 'GET':
      const stream = fs.createReadStream(
        path.join(__dirname, 'templates', 'form.some')
      );

      res.writeHead(200, { 'Content-Type': 'text/html' });
      stream.pipe(res);
      break;
    case 'POST':
      let body = '';

      req.on('data', data => {
        body += data;
      });

      req.on('end', () => {
        const data = parseRequestBody(body);
        console.log(data);
        renderTemplate('post', data, (error, html) => {
          if (error) {
            handleError(error);
          }

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(html);
        });
      });
      break;
  }
});

server.listen(3000, () => console.log('Server is working'));
