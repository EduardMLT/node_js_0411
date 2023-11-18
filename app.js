const express = require('express');

const { tasksRouter } = require("./routes/tasks");

const app = express();

app.use(express.json());
app.use("/tasks", tasksRouter); // викликаємо і папки плюсуємо - тобто буде http://localhost:3000/tasks/test

module.exports = app;