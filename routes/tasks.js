const express = require("express");
const {
  getAllTasks,
  getOneTask,
  createTask,
  deleteTask,
  putTask,
  patchTask
} = require("../controllers/tasksController");

const router = express.Router();

router.get("/", getAllTasks); //відобразити все

router.get("/:id", getOneTask); //пошук по ID

router.post("/", createTask); //нове додавання

router.put("/:id", putTask);  //повне оновлення

router.patch("/:id", patchTask); // часткове оновлення

router.delete("/:id", deleteTask); //видалення

module.exports = { tasksRouter: router }; //new name

//маршрутизація