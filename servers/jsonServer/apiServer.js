const http = require('http');
const dataList = require('./data/data');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/todos') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=urf-8'
    });
    res.end(JSON.stringify(dataList));
  } else if (req.url === '/todos/completed') {
    const completedList = dataList.filter(todo => todo.completed);

    res.writeHead(200, {
      'Content-Type': 'application/json; charset=urf-8'
    });
    res.end(JSON.stringify(completedList));
  } else if (req.url.match(/\/todos\/\d+/)) {
    const id = parseInt(req.url.replace(/\D+/, ''));

    const todo = dataList.find(todo => todo.id === id);

    if (!todo) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.end("This item doesn't exist.");
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=urf-8'
      });
      res.end(JSON.stringify(todo));
    }
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.end('Check your path and parameters.');
  }
});

server.listen(3000, () => console.log('Server is working'));
