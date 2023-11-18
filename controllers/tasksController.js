const {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  deleteTaskService,
  putTaskService,
  patchTaskService
} = require("../services/tasksServices");

const getAllTasks = async (req, res, next) => {
  const tasks = await getAllTasksService();
  res.status(200).json(tasks);
  // res.send("Hello from tasks in controller");
  console.log("це tasks Controller - getAllTasks", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
};

const getOneTask = async (req, res, next) => {
  try {
    const { id } = req.params;
  const task = await getOneTaskService(id);
  res.status(200).json(task);
  // res.send("Hello from tasks in controller");
  console.log("це tasks Controller - getOneTasks", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

const createTask = async (req, res, next) => {
  try {    
    const newTask = await createTaskService(req.body);
    res.status(201).json(newTask);
    // res.send("Hello from tasks in controller");
    console.log("це tasks Controller - createTask", {
      url: req.originalUrl,
      statusMessage: res.statusMessage,
      statusCode: res.statusCode,
      body: req.body
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res, next) => {  
  try {    
    const { id } = req.params;    
    const delTask = await deleteTaskService(id);   
    res.status(200).json(delTask);
    // res.send("Hello from tasks in controller");
    console.log("це tasks Controller - deleteTask", {
      url: req.originalUrl,
      statusMessage: res.statusMessage,
      statusCode: res.statusCode
    });
  } catch (error) {
    res.status(500).json({ message_delTask_500: error.message });
  }
};

const putTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const renewedTask = await putTaskService(id, req.body);
    res.status(200).json(renewedTask);
    // res.send("Hello from tasks in controller");
    console.log("це tasks Controller - putTask", {
      url: req.originalUrl,
      statusMessage: res.statusMessage,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({ message_putTask_500: error.message });
  }
};

const patchTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const renewedTask = await patchTaskService(id, req.body);
    res.status(200).json(renewedTask);
    // res.send("Hello from tasks in controller");
    console.log("це tasks Controller - patchTask", {
      url: req.originalUrl,
      statusMessage: res.statusMessage,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({ message_patchTask_500: error.message });
  }
};


module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  deleteTask,
  putTask,
  patchTask
};

//завдання для контролера(обробника)

