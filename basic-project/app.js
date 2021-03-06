const express = require('express');
const todos = require('./todos');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'pug');

app.use(morgan('combined'));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Express and Pug', todos });
});

app.get('/todos', (req, res) => {
  if (req.query.completed) {
    return res.json(
      todos.filter(todo => todo.completed.toString() === req.query.completed)
    );
  }
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === +id);

  if (!todo) {
    return res.status(404).send("This todo isn't exist");
  }
  res.json(todo);
});

app.listen(3000, () => console.log('Server is working'));
