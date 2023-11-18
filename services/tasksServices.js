const crypto = require("crypto");

const { readDB, writeDb } = require("../utils/db");

const getAllTasksService = async () => {
  return await readDB();
};

const getOneTaskService = async (id) => {
  const tasks = await readDB();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

const createTaskService = async (body) => {
  const tasks = await readDB();
  const newTask = { ...body, id: crypto.randomUUID() };
  tasks.push(newTask);
  await writeDb(tasks);
  return newTask;
};

const deleteTaskService = async (id) => {  
  const tasks = await readDB();
  console.log(
    "це tasks Services - deleteTask, довжина масиву ",
    tasks.length
  );
  const index = tasks.findIndex((el) => el.id === id);
  
  if (index === -1) {
    throw new Error("Task not found");
  }  
  const newTasks = [
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1),
  ];
  
  console.log(
    "це tasks Services - deleteTask, довжина нового масиву",
    newTasks.length
  );
  
  await writeDb(newTasks);

  console.log("це tasks Services - deleteTask - видалено ", id);

    return id;

};

const putTaskService = async (id, body) => {
  const tasks = await readDB();
  console.log("1- це tasks Services - putTask, довжина масиву ", tasks.length);
  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new Error("Task not found");
  }

  const { title, completed } = body;
   
  if ((completed && title) === undefined ) {
    throw new Error("Not specified all values");
  }; // не працює з полем яке має значення true - false

  const newTask = { ...body, id };

  const newTasks = [
    ...tasks.slice(0, index),
    newTask,
    ...tasks.slice(index + 1),
  ];

  console.log(
    "2 - це tasks Services - putTask, довжина нового масиву",
    newTasks.length
  );

  await writeDb(newTasks);

  console.log("це tasks Services - putTask - оновлено ", id);

  return id;
};


// поле що перезаписується в масиві відображається першим ...
const patchTaskService = async (id, body) => {
  const tasks = await readDB();
  
  console.log("1- це tasks Services - patchTask, довжина масиву ", tasks.length);
  
  const index = tasks.findIndex((el) => el.id === id);
  console.log("2- це tasks Services - patchTask,  ", tasks[index]);

  const temporaryTitle = tasks[index].title;
  const temporaryCompleted = tasks[index].completed;
  console.log(
    "3- це tasks Services - patchTask,  ",
    temporaryTitle,
    temporaryCompleted
  );
  
  if (index === -1) {
    throw new Error("Task not found");
  }

  const { title, completed } = body;

  if (completed === undefined) {
    body.completed = temporaryCompleted;
  }

  if ((title) === undefined) {
    body.title = temporaryTitle;
  }   

  const newTask = { ...body, id };

  const newTasks = [
    ...tasks.slice(0, index),
    newTask,
    ...tasks.slice(index + 1),
  ];

  console.log(
    "4 - це tasks Services - patchTask, довжина нового масиву",
    newTasks.length
  );

  await writeDb(newTasks);

  console.log("це tasks Services - patchTask - оновлено ", id);

  return id;
};

module.exports = {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  deleteTaskService,
  putTaskService,
  patchTaskService
};

