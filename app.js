import express from 'express';
const bodyParser = require ('body-parser');


const app = express();
const port = 3666;
app.use(bodyParser.json());

let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === todoId);
    console.log(todo);
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      res.json(todo);
    }
  });  

// Add a new todo
app.post('/todos', (req, res) => {
    const { name, age, email, phonenumber } = req.body;
    const newTodo = { id: todos.length + 1, name, age, email, phonenumber };
    todos.push(newTodo);
    console.log(newTodo);
    res.status(201).json(newTodo);
  });

// Update an existing todo
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      todos[todoIndex] = { ...todos[todoIndex], ...req.body };
      res.json(todos[todoIndex]);
    }
  });

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== todoId);
    res.status(403).end();
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
