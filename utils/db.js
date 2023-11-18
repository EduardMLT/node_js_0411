// const { futimes } = require("node:fs");
const fs = require("fs/promises");
const path = require("path");


const tasksPath = path.join(__dirname, "..", "db", "tasks.json"); //замість - "../db/tasks.json"

const readDB = async () => {
  const rawJSON = await fs.readFile(tasksPath);

  return JSON.parse(rawJSON);
};

const writeDb = async (data) => {
  await fs.writeFile(tasksPath, JSON.stringify(data, null, 2));
};

module.exports = { readDB, writeDb };

//описуємо утиліти - читання і запис файлу а також шлях до файлу - з базою данних




