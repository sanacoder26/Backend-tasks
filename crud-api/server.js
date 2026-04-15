const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];

// post
app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title
  };

  tasks.push(newTask);

  res.json({
    message: "Task created successfully",
    data: newTask
  });
});

// get
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// put
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.title = req.body.title;

  res.json({
    message: "Task updated successfully",
    data: task
  });
});

// Delete
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  tasks = tasks.filter(t => t.id !== id);

  res.json({
    message: "Task deleted successfully"
  });
});

// Server runing
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});