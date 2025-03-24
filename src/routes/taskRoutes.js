const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// GET all tasks
router.get("/", getAllTasks);

// GET a single task
router.get("/:id", getTaskById);

// POST a new task
router.post("/", createTask);

// PUT (update) a task
router.put("/:id", updateTask);

// DELETE a task
router.delete("/:id", deleteTask);

module.exports = router;
