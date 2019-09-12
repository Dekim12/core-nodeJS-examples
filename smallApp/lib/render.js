const fs = require('fs');
const path = require('path');

const renderMethod = (res, data) => {
  fs.readFile(
    path.resolve('templates', 'movie.html'),
    'utf-8',
    (error, template) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end(error.message);
      }

      let html = template;

      if (data) {
        html = template.replace(/{{([^{}]*)}}/g, (placeholder, property) => {
          const match = data[property.trim()];

          return match || placeholder;
        });
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  );
};

module.exports = renderMethod;
