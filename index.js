import express from 'express';
const app = express();
app.use(express.json());

const port = 3000;

let todos = [];

// GET /todos: Get all todos
app.get('/', (req, res) => {
    res.send('Welcom to the Todo API');

});
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST /todos: Add a new todo
app.post('/todos', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo = {
        id: todos.length + 1,
        title
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// GET /todos/:id: Get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === todoId);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
});

// PUT /todos/:id: Update an existing todo
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    res.json(todos[todoIndex]);
});

// DELETE /todos/:id: Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== todoId);

    res.status(204).end();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
